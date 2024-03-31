'use client'

import React from 'react'

import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { useTaskModal } from '@/hooks/useTaskModal'

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
			<DialogContent>TASK MODAL</DialogContent>
		</Dialog>
	)
}
