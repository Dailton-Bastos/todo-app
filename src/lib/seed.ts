import { Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { db } from '../config/db'

async function main() {
	const hashedPassword = await bcrypt.hash('12345678', 10)

	const userData: Prisma.UserCreateInput[] = [
		{
			email: 'john.doe@teste.com',
			password: hashedPassword,
		},
		{
			email: 'dailtonbastos@gmail.com',
			password: hashedPassword,
		},
	]

	try {
		for (const u of userData) {
			await db.user.upsert({
				where: { email: u.email },
				update: {},
				create: {
					email: u.email,
					password: u.password,
				},
			})
		}
	} catch (error) {
		process.exit(1)
	} finally {
		await db.$disconnect()
	}
}

main()
