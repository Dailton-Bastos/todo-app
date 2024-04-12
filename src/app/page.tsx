import React from 'react'

import { Header } from '@/components/Header'
import { ListTasks } from '@/components/tasks/ListTasks'

const Home = () => {
	return (
		<section className='w-full pt-8'>
			<Header title='All Tasks' />

			<ListTasks />
		</section>
	)
}

export default Home
