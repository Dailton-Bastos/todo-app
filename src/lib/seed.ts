import { Prisma } from '@prisma/client'
import * as argon2 from 'argon2'

import { db } from '../config/db'

async function main() {
	const hashedPassword = await argon2.hash('12345678')

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
