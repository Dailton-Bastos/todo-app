'use client'

import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { useSession } from '@/providers/sessionProvider'
import { getUserInitialsName } from '@/utils/user'
import Link from 'next/link'

export const User = () => {
	const { user } = useSession()

	if (!user) return null

	const fallback = getUserInitialsName(user?.name || user.email)

	return (
		<div className='flex items-center justify-between gap-x-4 py-8'>
			<Link href='/me'>
				<Avatar>
					<AvatarImage src={user.image} />
					<AvatarFallback className='font-semibold text-lg'>
						{fallback}
					</AvatarFallback>
				</Avatar>
			</Link>

			<div className='w-full'>
				<h3 className='text-white font-semibold text-md'>{user.name}</h3>

				<span className='text-white font-semibold text-sm block truncate max-w-52'>
					{user.email}
				</span>
			</div>
		</div>
	)
}
