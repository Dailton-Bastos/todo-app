import React from 'react'
import Calendar from 'react-calendar'
import { useForm } from 'react-hook-form'

import { updateTask } from '@/actions/updateTask'
import { Spin } from '@/components/Spin'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { ToastAction } from '@/components/ui/Toast'
import { useTaskModal } from '@/hooks/useTaskModal'
import { useToast } from '@/hooks/useToast'
import { useTaskStore } from '@/providers/taskStoreProvider'
import { taskSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import 'react-calendar/dist/Calendar.css'

export const UpdateTaskForm = () => {
	const [isPending, startTransition] = React.useTransition()

	const { toast } = useToast()

	const { onClose } = useTaskModal()

	const {
		updateTask: storeUpdateTask,
		currentTask,
		setCurrentTask,
	} = useTaskStore((state) => state)

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		reValidateMode: 'onSubmit',
		defaultValues: {
			title: currentTask?.title || undefined,
			description: currentTask?.description || undefined,
			date: currentTask?.date ? new Date(currentTask.date) : undefined,
			isCompleted: currentTask?.isCompleted || undefined,
			isImportant: currentTask?.isImportant || undefined,
		},
	})

	const { control, handleSubmit, reset } = form

	const onSubmit = React.useCallback(
		(data: z.infer<typeof taskSchema>) => {
			startTransition(async () => {
				try {
					const response = await updateTask({ data, id: currentTask?.id })

					if (response.status === 'error') {
						toast({
							title: 'Oops! Something went wrong.',
							description: response.message,
						})
					}

					if (response.status === 'success' && response.task) {
						const { task } = response

						storeUpdateTask({ data: task, id: task.id })
						setCurrentTask({ data: null })

						reset()

						onClose()

						toast({
							description: response.message,
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
		[reset, onClose, toast, storeUpdateTask, currentTask, setCurrentTask],
	)

	return (
		<Form {...form}>
			<form className='w-full space-y-4' onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-4 pb-6'>
					<FormField
						control={control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-semibold'>Title</FormLabel>
								<FormControl>
									<Input
										placeholder='Hello World'
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
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-semibold'>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder='Task description'
										{...field}
										disabled={isPending}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name='date'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='font-semibold'>Date</FormLabel>
								<FormControl>
									<div className='flex items-center justify-center w-full'>
										<Calendar onChange={field.onChange} value={field.value} />
									</div>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name='isCompleted'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										disabled={isPending}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Mark as completed</FormLabel>
								</div>
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name='isImportant'
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										disabled={isPending}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel>Mark as important</FormLabel>
								</div>
							</FormItem>
						)}
					/>
				</div>

				<Button type='submit' className='w-full h-10'>
					{isPending && <Spin />}
					Update Task
				</Button>
			</form>
		</Form>
	)
}
