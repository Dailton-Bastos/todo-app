import React from 'react'

import { Header } from '@/components/Header'
import { AllTasks } from '@/components/tasks/All'

const Home = () => {
	return (
		<section className='w-full pt-8'>
			<Header title='All Tasks' />

			<AllTasks />
		</section>
	)
}

export default Home
