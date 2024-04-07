import { db } from '@/config/db'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Lucia } from 'lucia'

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			emailVerified: attributes.emailVerified,
			name: attributes.name,
			image: attributes.image,
			// don't expose the secret
			// rather expose whether if the user has setup 2fa
			isTwoFactorEnabled: attributes.isTwoFactorEnabled,
		}
	},
})

// IMPORTANT!
declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: {
			email: string
			emailVerified: Date
			name?: string
			image?: string
			isTwoFactorEnabled: boolean
		}
	}
}
