'use client'

import React from 'react'

import { useTaskStore } from '@/providers/taskStoreProvider'

import { NewTaskButton } from './NewTaskButton'
import { Task } from './Task'

export const AllTasks = () => {
	const { tasks } = useTaskStore((state) => state)

	return (
		<div className='w-full pt-10'>
			<ul className='grid grid-cols-4 gap-8'>
				{tasks.map((task) => (
					<Task key={task.id} task={task} />
				))}

				<NewTaskButton />
			</ul>
		</div>
	)
}
