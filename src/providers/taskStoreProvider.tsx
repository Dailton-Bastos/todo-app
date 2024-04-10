'use client'

import React from 'react'

import {
	type TaskStore,
	type Task,
	createTaskStore,
	initTaskStore,
} from '@/stores/task-store'
import { type StoreApi, useStore } from 'zustand'

type TaskStoreProviderProps = {
	children: React.ReactNode
	data: Task[]
}

export const TaskStoreContext = React.createContext<StoreApi<TaskStore> | null>(
	null,
)

export const TaskStoreProvider = ({
	children,
	data,
}: TaskStoreProviderProps) => {
	const storeRef = React.useRef<StoreApi<TaskStore>>()

	if (!storeRef.current) {
		storeRef.current = createTaskStore(initTaskStore({ data }))
	}

	return (
		<TaskStoreContext.Provider value={storeRef.current}>
			{children}
		</TaskStoreContext.Provider>
	)
}

export const useTaskStore = <T,>(selector: (store: TaskStore) => T): T => {
	const taskStoreContext = React.useContext(TaskStoreContext)

	if (!taskStoreContext) {
		throw new Error(`useTaskStore must be use within TaskStoreProvider`)
	}

	return useStore(taskStoreContext, selector)
}
