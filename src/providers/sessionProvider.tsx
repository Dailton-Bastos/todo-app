'use client'

import React from 'react'

import { logout } from '@/actions/logout'
import { ToastAction } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import type { Session, User } from 'lucia'

type SessionContextData = {
	session: Session | null
	user: User | null
	isLoggedIn: boolean
	logout: () => void
}

type SessionProviderData = {
	children: React.ReactNode
	session: Session | null
	user: User | null
}

const SessionContext = React.createContext<SessionContextData>({
	session: null,
	user: null,
	isLoggedIn: false,
	logout: () => {},
})

export const SessionProvider = ({
	children,
	session,
	user,
}: SessionProviderData) => {
	const isLoggedIn = !!user

	const { toast } = useToast()

	const handleLogout = React.useCallback(async () => {
		if (!session) {
			toast({
				title: 'Oops! Something went wrong.',
				description: 'Unauthorized',
			})

			return
		}

		try {
			const response = await logout()

			if (response.status === 'error') {
				toast({
					title: 'Oops! Something went wrong.',
					description: response.message,
				})
			}
		} catch {
			toast({
				variant: 'destructive',
				title: 'Oops! Something went wrong.',
				description: 'There was a problem with your request.',
				action: <ToastAction altText='Try again'>Try again</ToastAction>,
			})
		}
	}, [toast, session])

	const contextValue = React.useMemo(
		() => ({
			session,
			user,
			isLoggedIn,
			logout: handleLogout,
		}),
		[session, user, isLoggedIn, handleLogout],
	)

	return (
		<SessionContext.Provider value={contextValue}>
			{children}
		</SessionContext.Provider>
	)
}

export const useSession = () => {
	const context = React.useContext(SessionContext)

	if (!context) {
		throw new Error('useSession must be used within a SessionProvider')
	}

	return context
}
