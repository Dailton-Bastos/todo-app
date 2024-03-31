import React from 'react'
import { useForm } from 'react-hook-form'

import { register } from '@/actions/register'
import { CardWrapper } from '@/components/auth/CardWrapper'
import { PasswordChecklist } from '@/components/auth/PasswordChecklist'
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
import { usePasswordChecklist } from '@/hooks/usePasswordChecklist'
import { useToast } from '@/hooks/useToast'
import { registerSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type FormData = z.infer<typeof registerSchema>

export const RegisterForm = () => {
	const [isPending, startTransition] = React.useTransition()

	const { onClose } = useAuthModal()
	const { toast } = useToast()

	const form = useForm<FormData>({
		resolver: zodResolver(registerSchema),
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const { control, handleSubmit, watch, reset } = form

	const onSubmit = React.useCallback(
		(values: FormData) => {
			startTransition(async () => {
				try {
					const data = await register(values)

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
		[toast, onClose, reset],
	)

	const { rules, passwordChecked, checkPasswordRules } = usePasswordChecklist()

	const password = watch('password')

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

	React.useEffect(() => {
		checkPasswordRules(password)
	}, [password, checkPasswordRules])

	return (
		<CardWrapper headerLabel="Don't have an account?" footerLinks={footerLinks}>
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
									<FormLabel>Create a password</FormLabel>
									<FormControl>
										<Input
											placeholder='Your password'
											type='password'
											className='h-10'
											disabled={isPending}
											{...field}
										/>
									</FormControl>

									<PasswordChecklist rules={rules} />
								</FormItem>
							)}
						/>
					</div>

					<Button
						type='submit'
						className='w-full h-10'
						disabled={!passwordChecked || isPending}
					>
						{isPending && <Spin />}
						Sign up
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
