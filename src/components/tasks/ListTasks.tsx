'use client'

import React from 'react'

import { useSearch } from '@/hooks/useSearch'
import { filterTask } from '@/lib/utils'
import { useTaskStore } from '@/providers/taskStoreProvider'
import { Task as TaskType } from '@/stores/task-store'
import { useShallow } from 'zustand/react/shallow'

import { NewTaskButton } from './NewTaskButton'
import { Task } from './Task'

type TaskFilter = 'all' | 'important' | 'completed' | 'incomplete'

type Props = {
	type?: TaskFilter
}

export const ListTasks = ({ type = 'all' }: Props) => {
	const { searchResult, noResults } = useSearch(
		useShallow((state) => ({
			searchResult: state.data as TaskType[],
			noResults: state.noResults,
		})),
	)

	const { tasks } = useTaskStore((state) => state)

	const listData = tasks.filter((task) => filterTask({ task, type }))

	const data = searchResult.length === 0 ? listData : searchResult

	return (
		<div className='w-full pt-10'>
			{noResults ? (
				<p className='text-sm font-semibold text-white'>No tasks found.</p>
			) : (
				<ul className='grid grid-cols-4 gap-8'>
					{data.map((task) => (
						<Task key={task.id} task={task} />
					))}

					<NewTaskButton />
				</ul>
			)}
		</div>
	)
}
