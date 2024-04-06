'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { profile } from '@/actions/profile'
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
import { Switch } from '@/components/ui/Switch'
import { ToastAction } from '@/components/ui/Toast'
import { useToast } from '@/hooks/useToast'
import { profileSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from 'lucia'
import * as z from 'zod'

type Props = {
	user: User
}

export const ProfileForm = ({ user }: Props) => {
	const [isPending, startTransition] = React.useTransition()

	const { toast } = useToast()

	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		reValidateMode: 'onSubmit',
		defaultValues: {
			email: user.email || undefined,
			name: user.name || undefined,
			imageUrl: user.image || undefined,
			isTwoFactorEnabled: user.setupTwoFactor || undefined,
		},
	})

	const { control, handleSubmit } = form

	const onSubmit = React.useCallback(
		(values: z.infer<typeof profileSchema>) => {
			startTransition(async () => {
				try {
					const data = await profile(values)

					if (data.status === 'error') {
						toast({
							title: 'Oops! Something went wrong.',
							description: data.message,
						})
					}

					if (data.status === 'success') {
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
		[toast],
	)

	return (
		<div className='w-full max-w-3xl flex items-center justify-center flex-col'>
			<h1 className='text-2xl font-semibold text-white'>Profile Settings</h1>

			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='w-full h-full pt-10 space-y-6'
				>
					<div className='grid grid-cols-2 w-full gap-x-6'>
						<FormField
							control={control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-white'>Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Your name'
											className='h-10 text-white'
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
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-white'>Email</FormLabel>
									<FormControl>
										<Input
											placeholder='Your email'
											className='h-10 text-white'
											disabled={isPending}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={control}
						name='imageUrl'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-white'>Photo URL</FormLabel>
								<FormControl>
									<Input
										placeholder='Your photo URL'
										className='h-10 text-white'
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
						name='isTwoFactorEnabled'
						render={({ field }) => (
							<FormItem className='flex items-center justify-start gap-x-2'>
								<FormLabel className='text-white pt-2'>
									Two Factor Authorization
								</FormLabel>
								<FormControl>
									<Switch
										disabled={isPending}
										checked={field.value}
										onCheckedChange={field.onChange}
										className='mt-0'
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<div className='w-full flex items-center justify-between pt-4'>
						<Button type='submit' className='h-10 min-w-40' variant='outline'>
							{isPending && <Spin />}
							Save profile
						</Button>

						<Button
							type='button'
							className='h-10 min-w-40'
							variant='destructive'
							disabled={isPending}
						>
							Delete my account
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
