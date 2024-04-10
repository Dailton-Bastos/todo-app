'use client'

import React from 'react'

import { useTaskStore } from '@/providers/taskStoreProvider'

import { NewTaskButton } from './NewTaskButton'

export const DoItNowTasks = () => {
	const { tasks } = useTaskStore((state) => state)

	const inCompleteTasks = React.useMemo(() => {
		return tasks.filter((task) => !task.isCompleted).filter(Boolean)
	}, [tasks])

	return (
		<div className='w-full pt-10'>
			<ul className='grid grid-cols-4 gap-8'>
				{inCompleteTasks.map((task) => (
					<li key={task.id} className='text-white'>
						<h2>{task.title}</h2>
						<p>{task.description}</p>
					</li>
				))}

				<NewTaskButton />
			</ul>
		</div>
	)
}
