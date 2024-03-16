import React from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Props = {
	children: React.ReactNode
	className?: string
}

export const Box = ({ children, className }: Props) => {
	return (
		<Card className={cn('bg-neutral-900 h-fit w-full', className)}>
			{children}
		</Card>
	)
}
