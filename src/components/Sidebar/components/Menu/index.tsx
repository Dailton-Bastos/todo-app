'use client'

import React from 'react'
import {
	IoHomeOutline,
	IoAlertCircleOutline,
	IoCheckmarkDoneOutline,
	IoCloseOutline,
} from 'react-icons/io5'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Menu = () => {
	const pathname = usePathname()

	const routes = React.useMemo(
		() => [
			{
				icon: IoHomeOutline,
				label: 'All Tasks',
				isActive: pathname === '/',
				href: '/',
			},
			{
				icon: IoAlertCircleOutline,
				label: 'Important',
				isActive: pathname === '/tasks/important',
				href: '/tasks/important',
			},
			{
				icon: IoCheckmarkDoneOutline,
				label: 'Completed',
				isActive: pathname === '/tasks/completed',
				href: '/tasks/completed',
			},
			{
				icon: IoCloseOutline,
				label: 'Do It Now',
				isActive: pathname === '/tasks/do-it-now',
				href: '/tasks/do-it-now',
			},
		],
		[pathname],
	)

	return (
		<ul className='flex flex-col gap-y-1 w-full py-10'>
			{routes.map(({ label, href, isActive, icon: Icon }) => {
				return (
					<li
						key={label}
						className={cn(
							'flex items-center w-full h-full px-10 hover:bg-black/15',
							isActive && 'relative',
						)}
					>
						{isActive && (
							<div className='absolute h-full w-0.5 bg-green-500 left-0 rounded-r-md' />
						)}

						<Link
							href={href}
							className='flex items-center justify-start gap-x-4 text-white text-center font-semibold w-full text-lg py-2'
						>
							<Icon size={22} />
							{label}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
