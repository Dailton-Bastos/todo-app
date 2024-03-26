import React from 'react'

import { CardWrapper } from './CardWrapper'

export const ForgotForm = () => {
	const footerLinks = React.useMemo(
		() => [
			{
				label: 'Already have an account? Sign in',
				href: '/#auth-sign-in',
				type: 'login' as const,
			},
		],
		[],
	)

	return (
		<CardWrapper headerLabel='Forgot your password?' footerLinks={footerLinks}>
			Forgot Form
		</CardWrapper>
	)
}
