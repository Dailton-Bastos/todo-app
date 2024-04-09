'use client'

import React from 'react'

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogHeader,
} from '@/components/ui/Dialog'
import { useTaskModal } from '@/hooks/useTaskModal'

import { TasksForm } from './TasksForm'

export const TaskModal = () => {
	const { isOpen, onClose } = useTaskModal()

	const onChange = React.useCallback(
		(open: boolean) => {
			if (!open) return onClose()
		},
		[onClose],
	)

	return (
		<Dialog open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create a Task</DialogTitle>
				</DialogHeader>

				<TasksForm />
			</DialogContent>
		</Dialog>
	)
}
