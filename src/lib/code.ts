import { db } from '@/config/db'
import { getEmailVerificationCodeByEmail } from '@/utils/emailVerificationCode'
import { TimeSpan, createDate } from 'oslo'
import { generateRandomString, alphabet } from 'oslo/crypto'

export const generateEmailVerificationCode = async ({
	userId,
	email,
}: {
	userId: string
	email: string
}): Promise<string | null> => {
	try {
		const existingEmailCode = await getEmailVerificationCodeByEmail({ email })

		if (existingEmailCode) {
			await db.emailVerificationCode.deleteMany({ where: { userId } })
		}

		const code = generateRandomString(8, alphabet('0-9', 'A-Z'))
		const expiresAt = createDate(new TimeSpan(15, 'm')) // 15 minutes

		await db.emailVerificationCode.create({
			data: {
				code,
				userId,
				email,
				expiresAt,
			},
		})

		return code
	} catch {
		return null
	}
}
