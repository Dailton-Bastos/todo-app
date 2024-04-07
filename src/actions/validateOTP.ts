'use server'

import { lucia } from '@/auth'
import { db } from '@/config/db'
import { getUserById } from '@/utils/user'
import { cookies } from 'next/headers'
import { TimeSpan } from 'oslo'
import { decodeHex } from 'oslo/encoding'
import { TOTPController } from 'oslo/otp'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
}

export const validateOTP = async ({
	otp,
	userId,
}: {
	otp: string
	userId: string
}): Promise<ActionResult> => {
	if (!otp) {
		return { status: 'error', message: 'Missing Two-factor authorization code' }
	}

	try {
		const existingUser = await getUserById({ id: userId })

		if (!existingUser) {
			return { status: 'error', message: 'Unauthorized' }
		}

		const twoFactorSecret = existingUser.twoFactorSecret

		if (!twoFactorSecret) {
			return { status: 'error', message: 'Unauthorized' }
		}

		const period = new TimeSpan(30, 's') // 30 seconds

		const totpController = new TOTPController({ digits: 6, period })

		const validOTP = await totpController.verify(
			otp,
			decodeHex(twoFactorSecret),
		)

		if (validOTP) {
			const isTwoFactorEnabled = existingUser.isTwoFactorEnabled
				? undefined
				: true

			const updateUser = await db.user.update({
				where: { id: existingUser.id },
				data: {
					isTwoFactorEnabled,
				},
			})

			await lucia.invalidateUserSessions(updateUser.id)
			const session = await lucia.createSession(updateUser.id, {})
			const sessionCookie = lucia.createSessionCookie(session.id)

			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			)

			return {
				status: 'success',
				message: null,
			}
		}

		return {
			status: 'error',
			message: 'The provided Two-factor authorization code was invalid',
		}
	} catch {
		return { status: 'error', message: 'Oops, something went wrong!' }
	}
}
