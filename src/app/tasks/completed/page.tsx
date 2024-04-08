import React from 'react'

import { Header } from '@/components/Header'
import { CompletedTasks } from '@/components/tasks/Completed'

const TasksCompletedPage = () => {
	return (
		<section className='w-full pt-8'>
			<Header title='Completed Tasks' />

			<CompletedTasks />
		</section>
	)
}

export default TasksCompletedPage
