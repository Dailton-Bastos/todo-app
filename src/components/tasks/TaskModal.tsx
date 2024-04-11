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
import { UpdateTaskForm } from './UpdateTaskForm'

export const TaskModal = () => {
	const { isOpen, onClose, activeForm } = useTaskModal()

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
					<DialogTitle>
						{activeForm === 'create' ? 'Create a Task' : 'Update Task'}
					</DialogTitle>
				</DialogHeader>

				{activeForm === 'create' && <TasksForm />}

				{activeForm === 'update' && <UpdateTaskForm />}
			</DialogContent>
		</Dialog>
	)
}
