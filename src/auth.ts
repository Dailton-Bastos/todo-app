import { db } from '@/config/db'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { Lucia } from 'lucia'

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
		}
	},
})

// IMPORTANT!
declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: {
			email: string
		}
	}
}
