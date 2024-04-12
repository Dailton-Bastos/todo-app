'use client'

import React from 'react'
import { IoAddOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/Button'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useTaskModal } from '@/hooks/useTaskModal'
import { useSession } from '@/providers/sessionProvider'

import { Search } from '../Search'

type SearchOn = 'all' | 'important' | 'completed' | 'incomplete'

type Props = {
	title: string
	searchType?: SearchOn
}

export const Header = ({ title, searchType = 'all' }: Props) => {
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

			<Search type={searchType} />

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
