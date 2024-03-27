import React from 'react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'

import { AuthFooter } from './AuthFooter'
import { AuthHeader } from './AuthHeader'

type AuthForm = 'login' | 'register' | 'forgot'

type Props = {
	children: React.ReactNode
	headerLabel: string
	footerLinks: Array<{
		href: string
		label: string
		type: AuthForm
	}>
}

export const CardWrapper = ({
	children,
	headerLabel,
	footerLinks = [],
}: Props) => {
	return (
		<Card className='border-none shadow-none w-full max-w-lg'>
			<CardHeader>
				<AuthHeader label={headerLabel} />
			</CardHeader>

			<CardContent>{children}</CardContent>

			<CardFooter>
				<AuthFooter links={footerLinks} />
			</CardFooter>
		</Card>
	)
}
