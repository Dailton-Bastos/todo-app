import React from 'react'

import { Box } from '@/components/Box'
import { Footer } from '@/components/Sidebar/components/Footer'
import { Menu } from '@/components/Sidebar/components/Menu'
import { User } from '@/components/Sidebar/components/User'

export const Sidebar = () => {
	return (
		<Box className='h-full min-h-[calc(100vh-16px)] border-none max-w-80'>
			<div className='flex flex-col items-center justify-between gap-y-2 py-10 h-full'>
				<User />

				<Menu />

				<Footer />
			</div>
		</Box>
	)
}
