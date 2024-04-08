'use client'

import React from 'react'
import { IoAddOutline, IoSearchOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useTaskModal } from '@/hooks/useTaskModal'
import { useSession } from '@/providers/sessionProvider'

type Props = {
	title: string
}

export const Header = ({ title }: Props) => {
	const { onOpen: onOpenAuthModal } = useAuthModal()
	const { onOpen: onOpenTaskModal } = useTaskModal()

	const { isLoggedIn } = useSession()

	const openNewTaskModal = React.useCallback(() => {
		if (!isLoggedIn) {
			onOpenAuthModal()

			return
		}

		onOpenTaskModal()
	}, [isLoggedIn, onOpenAuthModal, onOpenTaskModal])

	return (
		<header className='flex items-center justify-between'>
			<h1 className='text-2xl text-white font-bold relative before:absolute before:inset-10 before:left-0 before:w-8 before:h-1 before:bg-green-500'>
				{title}
			</h1>

			<div className='relative w-full max-w-3xl'>
				<label htmlFor='simple-search' className='sr-only'>
					Search tasks
				</label>
				<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
					<IoSearchOutline className='w-6 h-6 stroke-gray-500' />
				</div>

				<Input
					placeholder='Search tasks'
					type='text'
					className='h-10 min-w-56 block w-full p-2.5 ps-10 border-gray-500 focus-visible:ring-transparent focus:border-green-500 text-white text-sm font-normal'
					id='simple-search'
				/>
			</div>

			<Button
				className='flex items-center rounded-full border-2 border-gray-500 p-0 w-10 h-10'
				aria-label='Add new task'
				onClick={openNewTaskModal}
			>
				<IoAddOutline className='w-6 h-6 stroke-gray-500' />
			</Button>
		</header>
	)
}
