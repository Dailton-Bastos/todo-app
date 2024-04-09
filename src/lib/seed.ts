import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import * as argon2 from 'argon2'

import { db } from '../config/db'

async function main() {
	const hashedPassword = await argon2.hash('12345678')

	const userData: Prisma.UserCreateInput[] = [
		{
			email: faker.internet.email(),
			password: hashedPassword,
		},
		{
			email: faker.internet.email(),
			password: hashedPassword,
		},
		{
			email: faker.internet.email(),
			password: hashedPassword,
		},
		{
			email: faker.internet.email(),
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
					name: faker.person.fullName(),
					image: faker.image.avatar(),
					Task: {
						create: [
							{
								title: faker.word.words({ count: 3 }),
								description: faker.word.words({ count: 5 }),
								date: faker.date.future(),
							},
							{
								title: faker.word.words({ count: 3 }),
								description: faker.word.words({ count: 5 }),
								date: faker.date.future(),
							},
							{
								title: faker.word.words({ count: 3 }),
								description: faker.word.words({ count: 5 }),
								date: faker.date.future(),
							},
							{
								title: faker.word.words({ count: 3 }),
								description: faker.word.words({ count: 5 }),
								date: faker.date.future(),
							},
							{
								title: faker.word.words({ count: 3 }),
								description: faker.word.words({ count: 5 }),
								date: faker.date.future(),
							},
							{
								title: faker.word.words({ count: 3 }),
								description: faker.word.words({ count: 5 }),
								date: faker.date.future(),
							},
						],
					},
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
