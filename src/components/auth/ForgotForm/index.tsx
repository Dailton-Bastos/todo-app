import React from 'react'
import { useForm } from 'react-hook-form'

import { CardWrapper } from '@/components/auth/CardWrapper'
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
import { forgotSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

type FormData = z.infer<typeof forgotSchema>

export const ForgotForm = () => {
	const form = useForm<FormData>({
		resolver: zodResolver(forgotSchema),
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
		},
	})

	const { control, handleSubmit } = form

	const onSubmit = React.useCallback((values: FormData) => {
		return values
	}, [])

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
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type='submit' className='w-full h-10'>
						Send reset password instructions
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
