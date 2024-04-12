import React from 'react'

import { Header } from '@/components/Header'
import { ListTasks } from '@/components/tasks/ListTasks'

const TasksImportantPage = () => {
	return (
		<section className='w-full pt-8'>
			<Header title='Important Tasks' searchType='important' />

			<ListTasks type='important' />
		</section>
	)
}

export default TasksImportantPage
