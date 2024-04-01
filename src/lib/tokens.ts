import { db } from '@/config/db'
import { generateId } from 'lucia'
import { TimeSpan, createDate } from 'oslo'
import { sha256 } from 'oslo/crypto'
import { encodeHex } from 'oslo/encoding'

export const createPasswordResetToken = async ({
	userId,
}: {
	userId: string
}): Promise<string | null> => {
	try {
		// Invalidate all existing tokens
		await db.passwordResetToken.deleteMany({ where: { userId } })

		const tokenId = generateId(40)

		const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)))

		const expiresAt = createDate(new TimeSpan(2, 'h')) // 2 hours

		await db.passwordResetToken.create({
			data: {
				tokenHash,
				userId,
				expiresAt,
			},
		})

		return tokenId
	} catch {
		return null
	}
}
