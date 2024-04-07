import React from 'react'
import { useForm } from 'react-hook-form'
import OtpInput from 'react-otp-input'

import { login } from '@/actions/login'
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
import { loginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type FormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
	const [showTwoFactor, setShowTwoFactor] = React.useState(false)

	const [isPending, startTransition] = React.useTransition()

	const { onClose } = useAuthModal()
	const { toast } = useToast()

	const form = useForm<FormData>({
		resolver: zodResolver(loginSchema),
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	})

	const { control, handleSubmit, reset } = form

	const onSubmit = React.useCallback(
		(values: FormData) => {
			startTransition(async () => {
				try {
					const data = await login(values)

					if (data.status === 'error' && !data.isTwofactorEnabled) {
						toast({
							title: 'Oops! Something went wrong.',
							description: data.message,
						})
					}

					if (data.status === 'success') {
						reset()
						onClose()
						setShowTwoFactor(false)

						if (data.message) {
							toast({
								description: data.message,
							})
						}
					}

					if (data.status === 'error' && data.isTwofactorEnabled) {
						setShowTwoFactor(true)

						toast({
							description: 'Enter the generated OTP code',
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
				label: 'Forgot your password?',
				href: '/#auth-forgot-password',
				type: 'forgot' as const,
			},
			{
				label: "Don't have an account? Sign up",
				href: '/#auth-sign-up',
				type: 'register' as const,
			},
		],
		[],
	)

	return (
		<CardWrapper headerLabel='Login to your account' footerLinks={footerLinks}>
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
											disabled={isPending}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your password</FormLabel>
									<FormControl>
										<Input
											placeholder='Your password'
											type='password'
											className='h-10'
											disabled={isPending}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						{showTwoFactor && (
							<FormField
								control={control}
								name='code'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
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
						)}
					</div>

					<Button type='submit' className='w-full h-10' disabled={isPending}>
						{isPending && <Spin />}

						{showTwoFactor ? 'Confirm' : 'Sign in'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
