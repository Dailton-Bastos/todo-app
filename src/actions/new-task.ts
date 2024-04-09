'use server'

import { db } from '@/config/db'
import { taskSchema } from '@/schemas'
import { validateRequest } from '@/utils/session'
import * as z from 'zod'

type ActionResult = {
	status: 'error' | 'success'
	message: string | null
}

export const newTask = async (
	values: z.infer<typeof taskSchema>,
): Promise<ActionResult> => {
	const validatedFields = taskSchema.safeParse(values)

	if (!validatedFields.success) {
		return { status: 'error', message: 'Invalid fields' }
	}

	const { title, description, date, isCompleted, isImportant } =
		validatedFields.data

	try {
		const { user } = await validateRequest()

		if (!user) return { status: 'error', message: 'Unauthorized' }

		await db.task.create({
			data: {
				title,
				description,
				date,
				isCompleted,
				isImportant,
				userId: user.id,
			},
		})

		return { status: 'success', message: 'Task created' }
	} catch (error) {
		return { status: 'error', message: 'Oops, something went wrong!' }
	}
}
