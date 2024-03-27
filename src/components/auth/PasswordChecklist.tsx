import React from 'react'
import { IoIosCheckmark, IoIosClose } from 'react-icons/io'

import { cn } from '@/lib/utils'

type Props = {
	rules: {
		lower: boolean
		upper: boolean
		number: boolean
		special: boolean
		length: boolean
	}
}

export const PasswordChecklist = ({ rules }: Props) => {
	const rulesToCheck = React.useMemo(
		() => [
			{
				isValid: rules.length,
				message: 'Minimum 8 characters',
			},
			{
				isValid: rules.special,
				message: 'At least one special character',
			},
			{
				isValid: rules.lower,
				message: 'At least one lowercase letter',
			},
			{
				isValid: rules.upper,
				message: 'At least one uppercase letter',
			},
			{
				isValid: rules.number,
				message: 'At least one number',
			},
		],
		[rules],
	)
	return (
		<div className='w-full py-2'>
			<ul className='w-full'>
				{rulesToCheck.map((rule) => (
					<li
						className={cn(
							'flex items-center gap-1 text-sm py-1',
							rule.isValid ? 'text-black' : 'text-gray-600',
						)}
						key={rule.message}
					>
						{rule.isValid ? (
							<IoIosCheckmark size={22} />
						) : (
							<IoIosClose size={22} />
						)}
						{rule.message}
					</li>
				))}
			</ul>
		</div>
	)
}
