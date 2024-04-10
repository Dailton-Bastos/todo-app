'use client'

import React from 'react'

import { useTaskStore } from '@/providers/taskStoreProvider'

import { NewTaskButton } from './NewTaskButton'
import { Task } from './Task'

export const ImportantTasks = () => {
	const { tasks } = useTaskStore((state) => state)

	const importantTasks = React.useMemo(() => {
		return tasks.filter((task) => task.isImportant).filter(Boolean)
	}, [tasks])

	return (
		<div className='w-full pt-10'>
			<ul className='grid grid-cols-4 gap-8'>
				{importantTasks.map((task) => (
					<Task key={task.id} task={task} />
				))}

				<NewTaskButton />
			</ul>
		</div>
	)
}
