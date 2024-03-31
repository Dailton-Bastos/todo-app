'use server'

import { lucia } from '@/auth'
import { validateRequest } from '@/utils/session'
import { cookies } from 'next/headers'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
}

export const logout = async (): Promise<ActionResult> => {
	const { session } = await validateRequest()

	if (!session) {
		return { status: 'error', message: 'Unauthorized' }
	}

	try {
		await lucia.invalidateSession(session.id)

		const sessionCookie = lucia.createBlankSessionCookie()

		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)

		return { status: 'success', message: 'Successfully sign out' }
	} catch {
		return {
			status: 'error',
			message: 'There was a problem with your request.',
		}
	}
}
