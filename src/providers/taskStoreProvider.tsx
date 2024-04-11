'use client'

import React from 'react'

import {
	type TaskStore,
	type Task,
	createTaskStore,
	initTaskStore,
} from '@/stores/task-store'
import { type StoreApi, useStore } from 'zustand'

import { useSession } from './sessionProvider'

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

	const { user } = useSession()

	const tasks = user ? data : []

	storeRef.current = createTaskStore(initTaskStore({ data: tasks }))

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
