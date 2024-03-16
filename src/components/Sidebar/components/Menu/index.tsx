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
				label: 'Minhas tarefas',
				isActive: pathname === '/',
				href: '/',
			},
			{
				icon: IoAlertCircleOutline,
				label: 'Importantes',
				isActive: pathname === '/important',
				href: '/important',
			},
			{
				icon: IoCheckmarkDoneOutline,
				label: 'Concluídas',
				isActive: pathname === '/completed',
				href: '/completed',
			},
			{
				icon: IoCloseOutline,
				label: 'Incompletas',
				isActive: pathname === '/todo',
				href: '/todo',
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
