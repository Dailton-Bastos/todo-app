import { cache } from 'react'

import { lucia } from '@/auth'
import type { Session, User } from 'lucia'
import { cookies } from 'next/headers'

type ValidateRequest = {
	session: Session | null
	user: User | null
	isLoggedIn: boolean
}

export const validateRequest = cache(async (): Promise<ValidateRequest> => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

	if (!sessionId) {
		return {
			session: null,
			user: null,
			isLoggedIn: false,
		}
	}

	const { session, user } = await lucia.validateSession(sessionId)

	const isLoggedIn = !!user

	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id)
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			)
		}

		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie()
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			)
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}

	return {
		session,
		user,
		isLoggedIn,
	}
})
