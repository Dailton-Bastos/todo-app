import React from 'react'

import { Header } from '@/components/Header'
import { ImportantTasks } from '@/components/tasks/Important'

const TasksImportantPage = () => {
	return (
		<section className='w-full pt-8'>
			<Header title='Important Tasks' />

			<ImportantTasks />
		</section>
	)
}

export default TasksImportantPage
