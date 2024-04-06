'use server'

import { db } from '@/config/db'
import { generateEmailVerificationCode } from '@/lib/code'
import { registerSchema } from '@/schemas'
import { client } from '@/trigger'
import { getUserByEmail } from '@/utils/user'
import * as argon2 from 'argon2'
import * as z from 'zod'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
}

export const register = async (
	values: z.infer<typeof registerSchema>,
): Promise<ActionResult> => {
	const validatedFields = registerSchema.safeParse(values)

	if (!validatedFields.success) {
		return { status: 'error', message: 'Invalid email or password' }
	}

	const { email, password } = validatedFields.data

	const existingUser = await getUserByEmail({ email })

	if (existingUser) {
		return { status: 'error', message: 'Email does not available' }
	}

	const hashedPassword = await argon2.hash(password)

	const newUser = await db.user.create({
		data: {
			email,
			password: hashedPassword,
			twoFactorSecret: null,
		},
	})

	const code = await generateEmailVerificationCode({
		email,
		userId: newUser.id,
	})

	if (code) {
		await client.invokeJob('email-verification-code', { email, code })

		return {
			status: 'success',
			message: 'Confirmation email sent',
		}
	}

	return { status: 'error', message: 'Oops, something went wrong!' }
}
