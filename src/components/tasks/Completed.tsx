import React from 'react'

import { NewTaskButton } from './NewTaskButton'

export const CompletedTasks = () => {
	return (
		<div className='w-full pt-10 grid grid-cols-4 gap-8'>
			<NewTaskButton />
		</div>
	)
}