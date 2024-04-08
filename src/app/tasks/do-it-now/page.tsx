import React from 'react'

import { Header } from '@/components/Header'
import { DoItNowTasks } from '@/components/tasks/DoItNow'

const TasksDoItNowPage = () => {
	return (
		<section className='w-full pt-8'>
			<Header title='Do It Now Tasks' />

			<DoItNowTasks />
		</section>
	)
}

export default TasksDoItNowPage
