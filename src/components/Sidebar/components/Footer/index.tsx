'use client'

import React from 'react'
import {
	IoSunnyOutline,
	IoLogInOutline,
	IoLogOutOutline,
} from 'react-icons/io5'

import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useSession } from '@/providers/sessionProvider'

export const Footer = () => {
	const { isLoggedIn, logout } = useSession()
	const { onOpen } = useAuthModal()

	return (
		<ul className='flex flex-col gap-y-2 w-full py-8'>
			<li className='w-full h-full py-4 px-10 flex items-center gap-x-4 text-white font-semibold text-lg'>
				<IoSunnyOutline size={22} />
				Light
				<Switch />
			</li>

			{isLoggedIn ? (
				<li className='w-full h-full px-10'>
					<Button
						variant='link'
						className='flex items-center justify-start gap-x-4 text-white font-semibold text-lg w-full px-0'
						onClick={logout}
					>
						<IoLogOutOutline size={22} />
						Logout
					</Button>
				</li>
			) : (
				<li className='w-full h-full px-10'>
					<Button
						variant='link'
						className='flex items-center justify-start gap-x-4 text-white font-semibold text-lg w-full px-0'
						onClick={onOpen}
					>
						<IoLogInOutline size={22} />
						Sign in
					</Button>
				</li>
			)}
		</ul>
	)
}
