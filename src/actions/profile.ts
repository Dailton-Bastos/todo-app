'use server'

import { lucia } from '@/auth'
import { db } from '@/config/db'
import { generateEmailVerificationCode } from '@/lib/code'
import { profileSchema } from '@/schemas'
import { client } from '@/trigger'
import { validateRequest } from '@/utils/session'
import { getUserById, getUserByEmail } from '@/utils/user'
import { cookies } from 'next/headers'
import { encodeHex } from 'oslo/encoding'
import { createTOTPKeyURI } from 'oslo/otp'
import * as z from 'zod'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
	twoFactorUri?: string
}

export const profile = async (
	values: z.infer<typeof profileSchema>,
): Promise<ActionResult> => {
	const validatedFields = profileSchema.safeParse(values)

	if (!validatedFields.success) {
		return { status: 'error', message: 'Invalid email or password' }
	}

	const { email, name, imageUrl, isTwoFactorEnabled } = validatedFields.data

	try {
		const { user: currentUser } = await validateRequest()

		if (!currentUser) {
			return { status: 'error', message: 'Unauthorized' }
		}

		const user = await getUserById({ id: currentUser.id })

		if (!user) {
			return { status: 'error', message: 'Unauthorized' }
		}

		let emailUpdated = false

		if (email && email !== currentUser.email) {
			const existingUserEmail = await getUserByEmail({ email })

			if (existingUserEmail && existingUserEmail.id !== currentUser.id) {
				return { status: 'error', message: 'Email does not available' }
			}

			emailUpdated = true

			const code = await generateEmailVerificationCode({
				email,
				userId: currentUser.id,
			})

			if (code) {
				await client.invokeJob('email-verification-code', { email, code })
			}
		}

		// Generate a new secret (minimum 20 bytes) and create a new key URI with createTOTPKeyURI()
		const twoFactorSecret = crypto.getRandomValues(new Uint8Array(20))

		const updatedUser = await db.user.update({
			where: { id: currentUser.id },
			data: {
				email,
				name,
				image: imageUrl ? imageUrl : null,
				emailVerified: emailUpdated ? null : undefined,
				twoFactorSecret: isTwoFactorEnabled ? encodeHex(twoFactorSecret) : null,
				isTwoFactorEnabled: isTwoFactorEnabled === false ? false : undefined,
			},
		})

		let twoFactorUri = undefined

		if (isTwoFactorEnabled && !user.isTwoFactorEnabled) {
			// pass the website's name and the user identifier (e.g. email, username)
			const uri = createTOTPKeyURI('Todo', updatedUser.email, twoFactorSecret)

			twoFactorUri = uri
		}

		await lucia.invalidateUserSessions(updatedUser.id)
		const session = await lucia.createSession(updatedUser.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)

		return { status: 'success', message: 'Settings updated', twoFactorUri }
	} catch (e) {
		return { status: 'error', message: 'Oops, something went wrong!' }
	}
}
