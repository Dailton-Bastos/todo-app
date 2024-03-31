import React from 'react'

import { validateRequest } from '@/utils/session'

const Home = async () => {
	const { isLoggedIn, user } = await validateRequest()

	return <div className='text-white'>{isLoggedIn && JSON.stringify(user)}</div>
}

export default Home
