'use client'

import React from 'react'
import { CgSpinner } from 'react-icons/cg'

import { cn } from '@/lib/utils'

type Props = {
	className?: string
}

export const Spin = ({ className }: Props) => {
	return <CgSpinner className={cn('animate-spin h-5 w-5 mr-3', className)} />
}
