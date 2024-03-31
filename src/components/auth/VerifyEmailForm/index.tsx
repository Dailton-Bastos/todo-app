'use client'

import React from 'react'

import { verifyVerificationEmailCode } from '@/actions/verifyVerificationEmailCode'
import { CardWrapper } from '@/components/auth/CardWrapper'
import { Spin } from '@/components/Spin'
import { ToastAction } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import { useSearchParams } from 'next/navigation'

export const VerifyEmailForm = () => {
	const [error, setError] = React.useState<string | null>('')
	const [success, setSuccess] = React.useState<string | null>('')

	const searchParams = useSearchParams()

	const code = searchParams.get('code')

	const { toast } = useToast()

	const verifyEmailCode = React.useCallback(async () => {
		if (!code) {
			setError('Missing require code')

			return
		}

		try {
			const response = await verifyVerificationEmailCode({ code })

			if (response.status === 'success') {
				setError(null)
				setSuccess(response.message)
			}

			if (response.status === 'error') {
				setSuccess(null)
				setError(response.message)
			}
		} catch (error) {
			setError(null)
			setSuccess(null)

			toast({
				variant: 'destructive',
				title: 'Oops! Something went wrong.',
				description: 'There was a problem with your request.',
				action: (
					<ToastAction
						altText='Try again'
						onClick={() => {
							window.location.reload()
						}}
					>
						Try again
					</ToastAction>
				),
			})
		}
	}, [code, toast])

	const footerLinks = React.useMemo(
		() => [
			{
				label: 'Back to home',
				href: '/',
				type: null,
			},
		],
		[],
	)

	React.useEffect(() => {
		verifyEmailCode()
	}, [verifyEmailCode])

	return (
		<CardWrapper
			headerLabel='Confirming your verification'
			footerLinks={footerLinks}
		>
			<div className='w-full h-full flex items-center justify-center'>
				{!(error || success) && (
					<div className='flex items-center'>
						<Spin />
						<p className='text-sm'>Wait...</p>
					</div>
				)}

				{error && <p className='text-sm'>{error}</p>}

				{success && <p className='text-sm'>{success}</p>}
			</div>
		</CardWrapper>
	)
}
