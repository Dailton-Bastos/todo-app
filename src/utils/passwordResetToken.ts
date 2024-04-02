import { db } from '@/config/db'

export const getPasswordResetTokenByToken = async ({
	tokenHash,
}: {
	tokenHash: string
}) => {
	try {
		return db.passwordResetToken.findFirst({ where: { tokenHash } })
	} catch {
		return null
	}
}
