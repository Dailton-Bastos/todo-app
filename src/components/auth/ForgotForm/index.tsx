import React from 'react'
import { useForm } from 'react-hook-form'

import { resetPassword } from '@/actions/reset-password'
import { CardWrapper } from '@/components/auth/CardWrapper'
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
import { useAuthModal } from '@/hooks/useAuthModal'
import { useToast } from '@/hooks/useToast'
import { forgotSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type FormData = z.infer<typeof forgotSchema>

export const ForgotForm = () => {
	const [isPending, startTransition] = React.useTransition()

	const { onClose } = useAuthModal()
	const { toast } = useToast()

	const form = useForm<FormData>({
		resolver: zodResolver(forgotSchema),
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
		},
	})

	const { control, handleSubmit, reset } = form

	const onSubmit = React.useCallback(
		(values: FormData) => {
			startTransition(async () => {
				try {
					const data = await resetPassword(values)

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
							description: data.message,
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
		[onClose, reset, toast],
	)

	const footerLinks = React.useMemo(
		() => [
			{
				label: 'Already have an account? Sign in',
				href: '/#auth-sign-in',
				type: 'login' as const,
			},
		],
		[],
	)

	return (
		<CardWrapper headerLabel='Forgot your password?' footerLinks={footerLinks}>
			<Form {...form}>
				<form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
					<div className='space-y-4 pb-6'>
						<FormField
							control={control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email address</FormLabel>
									<FormControl>
										<Input
											placeholder='Your email address'
											className='h-10'
											{...field}
											disabled={isPending}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type='submit' className='w-full h-10' disabled={isPending}>
						{isPending && <Spin />}
						Send reset password instructions
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
