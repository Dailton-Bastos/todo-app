'use client'

import React from 'react'
import { CiLogout } from 'react-icons/ci'
import { IoSunnyOutline } from 'react-icons/io5'

import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { useSession } from '@/providers/sessionProvider'

export const Footer = () => {
	const { isLoggedIn, logout } = useSession()

	return (
		<ul className='flex flex-col gap-y-2 w-full py-8'>
			<li className='w-full h-full py-4 px-10 flex items-center gap-x-4 text-white font-semibold text-lg'>
				<IoSunnyOutline size={22} />
				Modo claro
				<Switch />
			</li>

			{isLoggedIn && (
				<li className='w-full h-full px-10'>
					<Button
						variant='link'
						className='flex items-center justify-start gap-x-4 text-white font-semibold text-lg w-full px-0'
						onClick={logout}
					>
						<CiLogout size={22} />
						Sair
					</Button>
				</li>
			)}
		</ul>
	)
}
