import React from 'react'
import { FcTodoList } from 'react-icons/fc'

type Props = {
	label: string
}

export const AuthHeader = ({ label }: Props) => {
	return (
		<header className='w-full flex flex-col gap-y-4 items-center'>
			<h1 className='text-3xl font-semibold flex items-center gap-x-4 pb-2'>
				<FcTodoList className='w-10 h-10' /> ToDo
			</h1>

			<p className='text-sm'>{label}</p>
		</header>
	)
}
