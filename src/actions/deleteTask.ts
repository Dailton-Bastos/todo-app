'use server'

import { db } from '@/config/db'
import { validateRequest } from '@/utils/session'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
}

export const deleteTask = async ({
	id,
}: {
	id: string
}): Promise<ActionResult> => {
	try {
		const { user } = await validateRequest()

		if (!user) return { status: 'error', message: 'Unauthorized' }

		await db.task.delete({ where: { id, AND: { userId: user.id } } })

		return { status: 'success', message: null }
	} catch {
		return { status: 'error', message: 'Oops, something went wrong!' }
	}
}
