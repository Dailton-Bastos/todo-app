import { db } from '@/config/db'

export const getEmailVerificationCodeByEmail = async ({
	email,
}: {
	email: string
}) => {
	try {
		return db.emailVerificationCode.findFirst({ where: { email } })
	} catch {
		return null
	}
}

export const getEmailVerificationCodeByCode = async ({
	code,
}: {
	code: string
}) => {
	try {
		return db.emailVerificationCode.findFirst({ where: { code } })
	} catch {
		return null
	}
}
