'use client'

import React from 'react'

import type { Session, User } from 'lucia'

type SessionContextData = {
	session: Session | null
	user: User | null
}

type SessionProviderData = {
	children: React.ReactNode
} & SessionContextData

const SessionContext = React.createContext<SessionContextData>({
	session: null,
	user: null,
})

export const SessionProvider = ({
	children,
	session,
	user,
}: SessionProviderData) => {
	const contextValue = React.useMemo(
		() => ({
			session,
			user,
		}),
		[session, user],
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
