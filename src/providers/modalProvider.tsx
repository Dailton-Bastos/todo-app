'use client'

import React from 'react'

import { AuthModal } from '@/components/auth/Modal'
import { TaskModal } from '@/components/tasks/TaskModal'
import { Modal2FA } from '@/components/two-factor-authorization/Modal2FA'

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
			<Modal2FA />
		</React.Fragment>
	)
}
