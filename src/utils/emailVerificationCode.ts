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
