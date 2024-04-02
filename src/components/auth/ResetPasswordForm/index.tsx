'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

import { newPassword } from '@/actions/new-password'
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
import { usePasswordChecklist } from '@/hooks/usePasswordChecklist'
import { useToast } from '@/hooks/useToast'
import { newPasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams, useRouter } from 'next/navigation'
import * as z from 'zod'

type FormData = z.infer<typeof newPasswordSchema>

export const ResetPasswordForm = () => {
	const [viewPassword, setViewPassword] = React.useState({
		password: false,
		confirmPassword: false,
	})
	const [isPending, startTransition] = React.useTransition()

	const { toast } = useToast()
	const searchParams = useSearchParams()
	const router = useRouter()

	const token = searchParams.get('token')

	const form = useForm<FormData>({
		resolver: zodResolver(newPasswordSchema),
		reValidateMode: 'onChange',
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	})

	const { control, handleSubmit, watch, reset } = form

	const onSubmit = React.useCallback(
		(values: FormData) => {
			startTransition(async () => {
				try {
					const data = await newPassword(values, token)
					if (data.status === 'error') {
						toast({
							title: 'Oops! Something went wrong.',
							description: data.message,
						})
					}
					if (data.status === 'success') {
						reset()
						toast({
							description: data.message,
						})

						router.push('/')
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
		[router, toast, reset, token],
	)

	const { rules, passwordChecked, checkPasswordRules } = usePasswordChecklist()

	const password = watch('password')

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
		checkPasswordRules(password)
	}, [password, checkPasswordRules])

	return (
		<CardWrapper headerLabel='Create new password' footerLinks={footerLinks}>
			<Form {...form}>
				<form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
					<div className='space-y-4 pb-6'>
						<FormField
							control={control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Your password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												placeholder='********'
												className='h-10'
												disabled={isPending}
												type={viewPassword.password ? 'text' : 'password'}
												{...field}
											/>

											<Button
												type='button'
												variant='link'
												className='absolute top-0 end-0 p-3.5 rounded-e-md'
												onClick={() =>
													setViewPassword((prev) => ({
														...prev,
														password: !prev['password'],
													}))
												}
											>
												{viewPassword.password ? (
													<FaRegEye />
												) : (
													<FaRegEyeSlash />
												)}
											</Button>
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm your password</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												placeholder='********'
												className='h-10'
												disabled={isPending}
												type={
													viewPassword.confirmPassword ? 'text' : 'password'
												}
												{...field}
											/>

											<Button
												type='button'
												variant='link'
												className='absolute top-0 end-0 p-3.5 rounded-e-md'
												onClick={() =>
													setViewPassword((prev) => ({
														...prev,
														confirmPassword: !prev['confirmPassword'],
													}))
												}
											>
												{viewPassword.confirmPassword ? (
													<FaRegEye />
												) : (
													<FaRegEyeSlash />
												)}
											</Button>
										</div>
									</FormControl>

									<FormMessage />

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
						Reset password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
