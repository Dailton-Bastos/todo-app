'use server'

import { createPasswordResetToken } from '@/lib/tokens'
import { resetPasswordSchema } from '@/schemas'
import { client } from '@/trigger'
import { getUserByEmail } from '@/utils/user'
import * as z from 'zod'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
}

export const resetPassword = async (
	values: z.infer<typeof resetPasswordSchema>,
): Promise<ActionResult> => {
	const validatedFields = resetPasswordSchema.safeParse(values)

	if (!validatedFields.success) {
		return { status: 'error', message: 'Invalid email' }
	}

	const { email } = validatedFields.data

	try {
		const existingUser = await getUserByEmail({ email })

		if (!existingUser) {
			return { status: 'error', message: 'Incorrect email' }
		}

		const resetPasswordToken = await createPasswordResetToken({
			userId: existingUser.id,
		})

		if (resetPasswordToken) {
			await client.invokeJob('email-reset-password-token', {
				email,
				token: resetPasswordToken,
			})

			return {
				status: 'success',
				message: "We'll send a reset email if the account exists",
			}
		}

		return {
			status: 'error',
			message: 'There was a problem with your request.',
		}
	} catch (error) {
		return { status: 'error', message: 'Oops, something went wrong!' }
	}
}
