import React from 'react'

import { Spin } from '@/components/Spin'

const Loading = () => {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<Spin className='h-10 w-10 text-white' />
			<span className='text-white text-lg'>Loading...</span>
		</div>
	)
}

export default Loading
