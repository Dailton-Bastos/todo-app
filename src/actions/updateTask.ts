'use server'

import { db } from '@/config/db'
import { taskSchema } from '@/schemas'
import type { Task } from '@/stores/task-store'
import { validateRequest } from '@/utils/session'
import * as z from 'zod'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
	task: Task | null
}

type Params = {
	data: z.infer<typeof taskSchema>
	id: string | undefined
}

export const updateTask = async ({
	data,
	id,
}: Params): Promise<ActionResult> => {
	const validatedFields = taskSchema.safeParse(data)

	if (!validatedFields.success) {
		return { status: 'error', message: 'Invalid email or password', task: null }
	}

	const { data: dataFields } = validatedFields

	try {
		const { user } = await validateRequest()

		if (!user) return { status: 'error', message: 'Unauthorized', task: null }

		if (!id) return { status: 'error', message: 'Unauthorized', task: null }

		const updatedTask = await db.task.update({
			where: { id, AND: { userId: user.id } },
			data: { ...dataFields },
		})

		return { status: 'success', message: 'Task updated', task: updatedTask }
	} catch {
		return {
			status: 'error',
			message: 'Oops, something went wrong!',
			task: null,
		}
	}
}
