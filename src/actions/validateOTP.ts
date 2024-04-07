'use server'

import { getUserById } from '@/utils/user'
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

		const totpController = new TOTPController()

		const validOTP = await totpController.verify(
			otp,
			decodeHex(twoFactorSecret),
		)

		if (validOTP) {
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
