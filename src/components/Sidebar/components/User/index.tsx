import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const User = () => {
	return (
		<div className='flex items-center justify-between gap-x-4 py-8'>
			<Avatar>
				<AvatarImage src='https://avatars.githubusercontent.com/u/36246937?v=4' />
				<AvatarFallback className='font-semibold text-lg'>DB</AvatarFallback>
			</Avatar>

			<div className='w-full'>
				<h3 className='text-white font-semibold text-md'>Dailton Bastos</h3>

				<span className='text-white font-semibold text-sm block truncate max-w-52'>
					dailtonbastos@gmail.com
				</span>
			</div>
		</div>
	)
}
