'use client'

import React from 'react'
import { FiEdit, FiTrash } from 'react-icons/fi'

import { deleteTask } from '@/actions/deleteTask'
import { Button } from '@/components/ui/Button'
import { ToastAction } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import { useTaskStore } from '@/providers/taskStoreProvider'
import type { Task as TaskParams } from '@/stores/task-store'

import { ConfirmCancelation } from './ConfirmCancelation'

type Props = {
	task: TaskParams
}

export const Task = ({ task }: Props) => {
	const [confirmCancell, setConfirmCancell] = React.useState(false)
	const [isPending, startTransition] = React.useTransition()

	const { toast } = useToast()
	const { deleteTask: storeDeleteTask } = useTaskStore((state) => state)

	const handleDeleteTask = React.useCallback(() => {
		startTransition(async () => {
			try {
				const response = await deleteTask({ id: task.id })

				if (response.status === 'success') {
					setConfirmCancell(false)

					storeDeleteTask({ id: task.id })
				}

				if (response.status === 'error') {
					setConfirmCancell(false)

					toast({
						title: 'Oops! Something went wrong.',
						description: response.message,
					})
				}
			} catch {
				setConfirmCancell(false)

				toast({
					variant: 'destructive',
					title: 'Oops! Something went wrong.',
					description: 'There was a problem with your request.',
					action: <ToastAction altText='Try again'>Try again</ToastAction>,
				})
			}
		})
	}, [task, toast, storeDeleteTask])

	const date = React.useMemo(() => {
		return new Intl.DateTimeFormat('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}).format(new Date(task.date))
	}, [task])

	React.useEffect(() => {
		if (!confirmCancell) return

		const timeout = window.setTimeout(() => {
			handleDeleteTask()
		}, 5000)

		return () => window.clearTimeout(timeout)
	}, [confirmCancell, handleDeleteTask])

	return (
		<li className=' bg-black/5 border border-gray-500 rounded-md min-w-40 min-h-60 shadow-sm p-4 grid'>
			{confirmCancell ? (
				<ConfirmCancelation
					handleCancell={() => setConfirmCancell(false)}
					isPending={isPending}
				/>
			) : (
				<div className='flex flex-col place-self-stretch'>
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

							<Button
								aria-label='Delete task'
								onClick={() => setConfirmCancell(true)}
							>
								<FiTrash className='w-5 h-5' />
							</Button>
						</div>
					</div>
				</div>
			)}
		</li>
	)
}
