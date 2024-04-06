import { db } from '@/config/db'

export const getUserByEmail = async ({ email }: { email: string }) => {
	try {
		return db.user.findUnique({ where: { email } })
	} catch {
		return null
	}
}

export const getUserById = async ({ id }: { id: string }) => {
	try {
		return db.user.findUnique({ where: { id } })
	} catch {
		return null
	}
}

export const getUserInitialsName = (name: string) => {
	if (name.trim().length <= 3) return name

	return name
		.split(' ')
		.map((chunk) => chunk.charAt(0).toLocaleUpperCase())
		.slice(0, 2)
		.join('')
}
