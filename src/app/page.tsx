import React from 'react'

import { validateRequest } from '@/utils/session'

const Home = async () => {
	const { isLoggedIn } = await validateRequest()

	return (
		<div>isLoggedIn: {isLoggedIn ? 'User loggedIn' : 'User not loggedIn'}</div>
	)
}

export default Home
