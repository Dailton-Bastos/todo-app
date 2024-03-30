'use server'

import { lucia } from '@/auth'
import { generateEmailVerificationCode } from '@/lib/code'
import { loginSchema } from '@/schemas'
import { getUserByEmail } from '@/utils/user'
import * as argon2 from 'argon2'
import { cookies } from 'next/headers'
import * as z from 'zod'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
}

export const login = async (
	values: z.infer<typeof loginSchema>,
): Promise<ActionResult> => {
	const validatedFields = loginSchema.safeParse(values)

	if (!validatedFields.success) {
		return { status: 'error', message: 'Invalid email or password' }
	}

	const { email, password } = validatedFields.data

	const existingUser = await getUserByEmail({ email })

	if (!existingUser || !existingUser?.password) {
		return { status: 'error', message: 'Incorrect email or password' }
	}

	const validPassword = await argon2.verify(existingUser.password, password)

	if (!validPassword) {
		return { status: 'error', message: 'Incorrect email or password' }
	}

	if (!existingUser.emailVerified) {
		const code = await generateEmailVerificationCode({
			email: existingUser.email,
			userId: existingUser.id,
		})

		if (code) {
			return {
				status: 'success',
				message: 'Confirmation email sent',
			}
		}

		return {
			status: 'error',
			message: 'There was a problem with your request.',
		}
	}

	try {
		const session = await lucia.createSession(existingUser.id, {})

		const sessionCookie = lucia.createSessionCookie(session.id)

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)

		return { status: 'success', message: 'Successfully sign in' }
	} catch {
		return { status: 'error', message: 'Oops, something went wrong!' }
	}
}
