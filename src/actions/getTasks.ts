'use server'

import { db } from '@/config/db'
import { validateRequest } from '@/utils/session'

type Task = {
	id: string
	title: string
	description: string
	date: Date
	isCompleted: boolean
	isImportant: boolean
	userId: string
}

export const getTasks = async (): Promise<Task[]> => {
	const { user } = await validateRequest()

	if (!user) return []

	try {
		return db.task.findMany({ where: { userId: user.id } })
	} catch {
		return []
	}
}
