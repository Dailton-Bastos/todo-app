import { Task } from '@/stores/task-store'
import { type ClassValue, clsx } from 'clsx'
import type { FuseResult } from 'fuse.js'
import { twMerge } from 'tailwind-merge'

type SearchOn = 'all' | 'important' | 'completed' | 'incomplete'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

// simulate a search from an API from local array
export async function searchByQuery<T>(data: Array<FuseResult<T>>) {
	return new Promise<T[]>((resolve) => {
		setTimeout(() => resolve(data.map((fuseResult) => fuseResult.item)), 1000)
	})
}

export function filterTask({ task, type }: { task: Task; type: SearchOn }) {
	switch (type) {
		case 'completed':
			return task.isCompleted
		case 'incomplete':
			return !task.isCompleted
		case 'important':
			return task.isImportant

		default:
			return task
	}
}
