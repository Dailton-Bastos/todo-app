import React from 'react'
import { useForm } from 'react-hook-form'
import OtpInput from 'react-otp-input'

import { validateOTP } from '@/actions/validateOTP'
import { Spin } from '@/components/Spin'
import { Button } from '@/components/ui/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { ToastAction } from '@/components/ui/Toast'
import { use2FAModal } from '@/hooks/use2FAModal'
import { useToast } from '@/hooks/useToast'
import { useSession } from '@/providers/sessionProvider'
import { twoFactorAuthorizationSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type FormData = z.infer<typeof twoFactorAuthorizationSchema>

export const Form2FA = () => {
	const [isPending, startTransition] = React.useTransition()

	const { user } = useSession()
	const { toast } = useToast()
	const { onClose } = use2FAModal()

	const userId = user?.id ?? ''

	const form = useForm<FormData>({
		resolver: zodResolver(twoFactorAuthorizationSchema),
		reValidateMode: 'onChange',
		defaultValues: {
			code: '',
		},
	})

	const { control, handleSubmit, reset } = form

	const onSubmit = React.useCallback(
		(values: FormData) => {
			startTransition(async () => {
				try {
					const data = await validateOTP({ otp: values.code, userId })

					if (data.status === 'error') {
						toast({
							title: 'Oops! Something went wrong.',
							description: data.message,
						})
					}

					if (data.status === 'success') {
						reset()
						onClose()

						toast({
							description: 'You have enabled Two-factor authorization',
						})
					}
				} catch {
					toast({
						variant: 'destructive',
						title: 'Oops! Something went wrong.',
						description: 'There was a problem with your request.',
						action: <ToastAction altText='Try again'>Try again</ToastAction>,
					})
				}
			})
		},
		[userId, toast, reset, onClose],
	)

	return (
		<Form {...form}>
			<form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<FormField
						control={control}
						name='code'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-center block font-semibold'>
									Two Factor Code
								</FormLabel>
								<FormControl>
									<OtpInput
										value={field.value}
										onChange={field.onChange}
										numInputs={6}
										renderSeparator={<span style={{ width: '4px' }}></span>}
										shouldAutoFocus={true}
										containerStyle='flex items-center justify-between p-2'
										inputStyle={{
											borderRadius: '8px',
											width: '54px',
											height: '54px',
											fontSize: '16px',
											color: '#000',
											fontWeight: '700',
											caretColor: '#222',
										}}
										renderInput={(props) => (
											<Input {...props} disabled={isPending} />
										)}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='w-full flex items-center justify-between gap-x-2'>
					<Button
						type='submit'
						className='h-10 min-w-40'
						variant='outline'
						disabled={isPending}
					>
						{isPending && <Spin />}
						Confirm
					</Button>

					<Button
						type='button'
						className='h-10 min-w-40'
						variant='destructive'
						disabled={isPending}
					>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	)
}
