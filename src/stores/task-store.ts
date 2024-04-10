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
			addTask: (task: Task) => {
				set(
					produce((draft: Draft<TaskStore>) => {
						draft.tasks.unshift(task)
					}),
				)
			},
		})),
	)
}
