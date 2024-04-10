'use client'

import React from 'react'

import { useTaskStore } from '@/providers/taskStoreProvider'

import { NewTaskButton } from './NewTaskButton'

export const AllTasks = () => {
	const { data } = useTaskStore((state) => state)

	return (
		<div className='w-full pt-10'>
			<ul className='grid grid-cols-4 gap-8'>
				{data.map((task) => (
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
