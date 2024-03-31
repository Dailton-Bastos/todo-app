import React from 'react'

import { Button } from '@/components/ui/Button'
import { useAuthModal } from '@/hooks/useAuthModal'
import Link from 'next/link'

type AuthForm = 'login' | 'register' | 'forgot'

type Props = {
	links: Array<{
		href: string
		label: string
		type: AuthForm | null
	}>
}

export const AuthFooter = ({ links = [] }: Props) => {
	const { setActiveAuthForm } = useAuthModal()

	const handleClick = React.useCallback(
		(e: React.MouseEvent<HTMLAnchorElement>, type: AuthForm | null) => {
			if (!type) return

			e.preventDefault()

			setActiveAuthForm(type)
		},
		[setActiveAuthForm],
	)

	return (
		<div className='w-full flex flex-col'>
			{links.map((link) => (
				<Button variant='link' size='sm' asChild key={link.href}>
					<Link
						href={link.href}
						onClick={(e) => {
							handleClick(e, link.type)
						}}
					>
						{link.label}
					</Link>
				</Button>
			))}
		</div>
	)
}
