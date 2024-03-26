import React from 'react'

import { CardWrapper } from './CardWrapper'

export const LoginForm = () => {
	const footerLinks = React.useMemo(
		() => [
			{
				label: 'Forgot your password?',
				href: '/#auth-forgot-password',
				type: 'forgot' as const,
			},
			{
				label: "Don't have an account? Sign up",
				href: '/#auth-sign-up',
				type: 'register' as const,
			},
		],
		[],
	)

	return (
		<CardWrapper headerLabel='Login to your account' footerLinks={footerLinks}>
			Login Form
		</CardWrapper>
	)
}
