import React from 'react'

import { Header } from '@/components/Header'
import { ListTasks } from '@/components/tasks/ListTasks'

const TasksCompletedPage = () => {
	return (
		<section className='w-full pt-8'>
			<Header title='Completed Tasks' searchType='completed' />

			<ListTasks type='completed' />
		</section>
	)
}

export default TasksCompletedPage
