import React from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'

import { Button } from '@/components/ui/Button'
import type { Task as TaskParams } from '@/stores/task-store'

type Props = {
	task: TaskParams
}

export const Task = ({ task }: Props) => {
	const date = React.useMemo(() => {
		return new Intl.DateTimeFormat('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}).format(new Date(task.date))
	}, [task])

	return (
		<li className=' bg-black/5 border border-gray-500 rounded-md min-w-40 min-h-60 shadow-sm p-4 flex flex-col'>
			<h2 className='text-white text-lg font-bold pb-3'>{task.title}</h2>

			<p className='text-sm text-white line-clamp-3'>{task.description}</p>

			<div className='flex items-end justify-between pt-3 mt-auto'>
				<div className='flex flex-col gap-y-2'>
					<span className='text-sm text-white'>{date}</span>

					{task.isCompleted ? (
						<Button className='bg-green-500 text-white font-semibold rounded-full transition-all hover:bg-green-500/50'>
							Completed
						</Button>
					) : (
						<Button className='bg-red-500 text-white font-semibold rounded-full transition-all hover:bg-red-500/50'>
							Incomplete
						</Button>
					)}
				</div>

				<div className='flex items-center justify-center'>
					<Button aria-label='Edit task'>
						<FiEdit className='w-5 h-5' />
					</Button>

					<Button aria-label='Delete task'>
						<FiTrash className='w-5 h-5' />
					</Button>
				</div>
			</div>
		</li>
	)
}
