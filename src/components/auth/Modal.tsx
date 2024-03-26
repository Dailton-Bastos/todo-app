'use client'

import React from 'react'

import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { useAuthModal } from '@/hooks/useAuthModal'

import { ForgotForm } from './ForgotForm'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export const AuthModal = () => {
	const { isOpen, onClose, activeAuthForm } = useAuthModal()

	const onChange = React.useCallback(
		(open: boolean) => {
			if (!open) return onClose()
		},
		[onClose],
	)

	return (
		<Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
			<DialogContent>
				{activeAuthForm === 'login' && <LoginForm />}

				{activeAuthForm === 'register' && <RegisterForm />}

				{activeAuthForm === 'forgot' && <ForgotForm />}
			</DialogContent>
		</Dialog>
	)
}
