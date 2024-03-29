import { db } from '@/config/db'

export const getUserByEmail = async ({ email }: { email: string }) => {
	try {
		return db.user.findUnique({ where: { email } })
	} catch {
		return null
	}
}
