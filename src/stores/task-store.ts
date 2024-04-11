import { type Draft, produce } from 'immer'
import { immer } from 'zustand/middleware/immer'
import { createStore } from 'zustand/vanilla'

export type Task = {
	id: string
	title: string
	description: string
	date: Date
	isCompleted: boolean
	isImportant: boolean
	userId: string
}

export type TaskState = {
	data: Task[]
}

export type TaskActions = {
	tasks: Task[]
	addTask: (task: Task) => void
	deleteTask: ({ id }: { id: string }) => void
	updateTask: ({ id }: { id: string; data: Task }) => void
	currentTask: Task | null
	setCurrentTask: ({ data }: { data: Task | null }) => void
}

export type TaskStore = TaskState & TaskActions

export const initTaskStore = ({ data }: { data: Task[] }): TaskState => {
	return { data }
}

const defaultInitState: TaskState = {
	data: [],
}

export const createTaskStore = (initState: TaskState = defaultInitState) => {
	return createStore<TaskStore>()(
		immer((set) => ({
			...initState,
			tasks: initState.data,
			currentTask: null,
			addTask: (task: Task) => {
				set(
					produce((draft: Draft<TaskStore>) => {
						draft.tasks.unshift(task)
					}),
				)
			},
			deleteTask: ({ id }: { id: string }) => {
				set(
					produce((draft: Draft<TaskStore>) => {
						const index = draft.tasks.findIndex((task) => task.id === id)

						if (index !== -1) draft.tasks.splice(index, 1)
					}),
				)
			},
			updateTask: ({ id, data }: { id: string; data: Task }) => {
				set(
					produce((draft: Draft<TaskStore>) => {
						const index = draft.tasks.findIndex((task) => task.id === id)

						if (index !== -1) {
							draft.tasks[index] = data
						}
					}),
				)
			},
			setCurrentTask: ({ data }: { data: Task | null }) => {
				set(
					produce((draft: Draft<TaskStore>) => {
						draft.currentTask = data
					}),
				)
			},
		})),
	)
}
