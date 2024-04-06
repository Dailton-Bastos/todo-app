'use server'

import { lucia } from '@/auth'
import { db } from '@/config/db'
import { getEmailVerificationCodeByCode } from '@/utils/emailVerificationCode'
import { getUserByEmail } from '@/utils/user'
import { cookies } from 'next/headers'
import { isWithinExpirationDate } from 'oslo'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
}

export const verifyVerificationEmailCode = async ({
	code,
}: {
	code: string
}): Promise<ActionResult> => {
	if (!code) {
		return { status: 'error', message: 'Missing require code' }
	}

	try {
		const existingCode = await getEmailVerificationCodeByCode({ code })

		if (!existingCode) {
			return { status: 'error', message: 'Code not found' }
		}

		const isValidCode = isWithinExpirationDate(existingCode.expiresAt)

		if (!isValidCode) {
			return { status: 'error', message: 'Code has expired or invalid' }
		}

		const existingUser = await getUserByEmail({ email: existingCode.email })

		if (!existingUser) {
			return { status: 'error', message: 'Email does not exist' }
		}

		await db.user.update({
			where: { id: existingCode.userId },
			data: {
				emailVerified: new Date(),
				email: existingCode.email,
			},
		})

		await db.emailVerificationCode.delete({
			where: { id: existingCode.id },
		})

		await lucia.invalidateUserSessions(existingCode.userId)

		const session = await lucia.createSession(existingCode.userId, {})

		const sessionCookie = lucia.createSessionCookie(session.id)

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)

		return { status: 'success', message: 'Successful email verified' }
	} catch {
		return { status: 'error', message: 'Oops, something went wrong!' }
	}
}
