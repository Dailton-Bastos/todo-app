import React from 'react'

import { CardWrapper } from './CardWrapper'

export const RegisterForm = () => {
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
		<CardWrapper headerLabel="Don't have an account?" footerLinks={footerLinks}>
			Register Form
		</CardWrapper>
	)
}
