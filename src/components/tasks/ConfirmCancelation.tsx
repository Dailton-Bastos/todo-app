import React from 'react'

import { Spin } from '@/components/Spin'
import { Button } from '@/components/ui/Button'
import { useProgress } from '@/hooks/useProgress'

type Props = {
	handleCancell: () => void
	isPending: boolean
}

export const ConfirmCancelation = ({
	handleCancell,
	isPending = false,
}: Props) => {
	const { progress } = useProgress({ value: 5 })

	const count = `${progress}`.padStart(2, '0')

	return (
		<div className='h-full place-self-stretch flex items-center justify-center flex-col'>
			{isPending ? (
				<Spin className='w-10 h-10 text-red-500' />
			) : (
				<React.Fragment>
					<div className='flex items-center justify-center w-full border rounded-lg p-3 mb-4 relative border-red-600'>
						<span className='text-red-500 text-sm font-semibold'>
							Excluindo em (00:{count})
						</span>

						<div className='absolute bg-red-400/30 w-0 h-full left-0 animate-progress-bar transition-all' />
					</div>

					<Button
						className='text-red-500 font-semibold'
						onClick={handleCancell}
					>
						Cancelar
					</Button>
				</React.Fragment>
			)}
		</div>
	)
}
