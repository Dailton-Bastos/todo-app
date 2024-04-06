import React from 'react'

import { ProfileForm } from '@/components/auth/ProfileForm'
import { validateRequest } from '@/utils/session'
import { redirect } from 'next/navigation'

const MePage = async () => {
	const { user } = await validateRequest()

	if (!user) return redirect('/')

	return (
		<section className='w-full pt-8 mx-auto flex items-center justify-center'>
			<ProfileForm user={user} />
		</section>
	)
}

export default MePage
