'use client'

import React from 'react'

import { AuthModal } from '@/components/auth/Modal'
import { TaskModal } from '@/components/tasks/TaskModal'

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<React.Fragment>
			<AuthModal />
			<TaskModal />
		</React.Fragment>
	)
}
