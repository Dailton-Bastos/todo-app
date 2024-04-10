'use client'

import React from 'react'

import { useTaskStore } from '@/providers/taskStoreProvider'

import { NewTaskButton } from './NewTaskButton'

export const ImportantTasks = () => {
	const { tasks } = useTaskStore((state) => state)

	const importantTasks = React.useMemo(() => {
		return tasks.filter((task) => task.isImportant).filter(Boolean)
	}, [tasks])

	return (
		<div className='w-full pt-10'>
			<ul className='grid grid-cols-4 gap-8'>
				{importantTasks.map((task) => (
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
