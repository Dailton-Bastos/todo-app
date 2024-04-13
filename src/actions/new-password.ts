'use server'

import { lucia } from '@/auth'
import { db } from '@/config/db'
import { newPasswordSchema } from '@/schemas'
import { client } from '@/trigger'
import { getPasswordResetTokenByToken } from '@/utils/passwordResetToken'
import { getUserById } from '@/utils/user'
import { cookies } from 'next/headers'
import { isWithinExpirationDate } from 'oslo'
import { sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'
import { Argon2id } from 'oslo/password'
import * as z from 'zod'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
}

export const newPassword = async (
	values: z.infer<typeof newPasswordSchema>,
	token?: string | null,
): Promise<ActionResult> => {
	const validatedFields = newPasswordSchema.safeParse(values)

	if (!validatedFields.success) {
		return { status: 'error', message: 'Invalid password' }
	}

	if (!token) {
		return { status: 'error', message: 'Missing riquired token' }
	}

	try {
		const tokenHash = encodeHex(await sha256(new TextEncoder().encode(token)))

		const existingToken = await getPasswordResetTokenByToken({ tokenHash })

		if (!existingToken) {
			return { status: 'error', message: 'Token not found' }
		}

		const isWithinExpirationToken = isWithinExpirationDate(
			existingToken.expiresAt,
		)

		if (!isWithinExpirationToken) {
			return { status: 'error', message: 'Token has expired or invalid' }
		}

		const existingUser = await getUserById({ id: existingToken.userId })

		if (!existingUser) {
			return { status: 'error', message: 'Email not found or incorrect' }
		}

		const { password } = validatedFields.data

		const hashedPassword = await new Argon2id().hash(password)

		await db.user.update({
			where: { id: existingToken.userId },
			data: {
				password: hashedPassword,
				emailVerified: existingUser.emailVerified ? undefined : new Date(),
			},
		})

		await db.passwordResetToken.deleteMany({
			where: { userId: existingToken.userId },
		})

		await lucia.invalidateUserSessions(existingToken.userId)

		if (!existingUser.isTwoFactorEnabled) {
			const session = await lucia.createSession(existingToken.userId, {})

			const sessionCookie = lucia.createSessionCookie(session.id)

			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			)
		}

		await client.invokeJob('notify-password-updated', {
			email: existingUser.email,
		})

		return { status: 'success', message: 'Successfully password updated' }
	} catch {
		return { status: 'error', message: 'Oops, something went wrong!' }
	}
}
