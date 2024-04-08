'use client'

import React from 'react'
import { IoAddOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/Button'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useTaskModal } from '@/hooks/useTaskModal'
import { useSession } from '@/providers/sessionProvider'

export const NewTaskButton = () => {
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
		<Button
			className='text-gray-500 bg-black/5 flex items-center justify-center gap-x-2 border border-gray-500 border-dashed rounded-md min-w-40 min-h-60 text-lg shadow-sm'
			onClick={openNewTaskModal}
		>
			<IoAddOutline className='w-6 h-6 stroke-gray-500' /> Add New Task
		</Button>
	)
}
