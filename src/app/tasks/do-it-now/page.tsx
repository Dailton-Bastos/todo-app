import React from 'react'

import { Header } from '@/components/Header'
import { ListTasks } from '@/components/tasks/ListTasks'

const TasksDoItNowPage = () => {
	return (
		<section className='w-full pt-8'>
			<Header title='Do It Now Tasks' searchType='incomplete' />

			<ListTasks type='incomplete' />
		</section>
	)
}

export default TasksDoItNowPage
