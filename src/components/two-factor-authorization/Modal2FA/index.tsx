import React from 'react'
import QRCode from 'react-qr-code'

import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { use2FAModal } from '@/hooks/use2FAModal'

import { Form2FA } from '../Form2FA'

export const Modal2FA = () => {
	const { isOpen, onClose, twoFactorUri, twoFactorCode } = use2FAModal()

	const onChange = React.useCallback(
		(open: boolean) => {
			if (!open) return onClose()
		},
		[onClose],
	)

	return (
		<Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
			<DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
				<div className='w-full'>
					<h2 className='text-center text-lg'>
						Finish enabling Two-factor authorization.
					</h2>

					<div className='flex flex-col items-center pt-2'>
						<p className='text-center text-sm text-gray-600'>
							To finish enabling two factor authorization, scan the following QR
							code using your phone&apos;s authenticator application and provide
							the generated OTP code.
						</p>
					</div>

					<div className='flex items-center justify-center px-2 py-6 bg-white'>
						<QRCode value={twoFactorUri} size={156} />
					</div>

					{twoFactorCode && (
						<div className='w-full pb-4'>
							<p className='text-center text-sm text-gray-600'>
								If you can&apos;t use QR code,{' '}
								<span className='font-semibold'>enter text code bellow</span>{' '}
								instead.
							</p>

							<p className='text-center text-sm text-gray-600 py-2'>
								{twoFactorCode}
							</p>
						</div>
					)}

					<Form2FA />
				</div>
			</DialogContent>
		</Dialog>
	)
}
