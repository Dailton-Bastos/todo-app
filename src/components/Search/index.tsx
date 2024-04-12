import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

import { Spin } from '@/components/Spin'
import { Input } from '@/components/ui/Input'
import { useSearch } from '@/hooks/useSearch'
import { filterTask, searchByQuery } from '@/lib/utils'
import { useTaskStore } from '@/providers/taskStoreProvider'
import type { Task } from '@/stores/task-store'
import type { IFuseOptions } from 'fuse.js'
import Fuse from 'fuse.js'
import { useShallow } from 'zustand/react/shallow'

type SearchOn = 'all' | 'important' | 'completed' | 'incomplete'

type Props = {
	type?: SearchOn
}

export const Search = ({ type = 'all' }: Props) => {
	const { tasks } = useTaskStore((state) => state)

	const debounceRef = React.useRef<ReturnType<typeof setTimeout>>()

	const { dispatch, isLoading, value } = useSearch(
		useShallow((state) => ({
			dispatch: state.dispatch,
			isLoading: state.isLoading,
			value: state.value,
		})),
	)

	const fuseData = tasks.filter((task) => filterTask({ task, type }))

	const fuse = React.useMemo(() => {
		const options: IFuseOptions<Task> = {
			isCaseSensitive: false,
			distance: 100,
			location: 0,
			shouldSort: true,
			sortFn: (a, b) => a.score - b.score,
			threshold: 0.6,
			keys: ['title', 'description'],
		}

		return new Fuse<Task>(fuseData, options)
	}, [fuseData])

	const onQueryChange = React.useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target

			dispatch({
				type: 'START_SEARCH',
				payload: value,
			})

			if (debounceRef.current) {
				clearTimeout(debounceRef.current)
			}

			debounceRef.current = setTimeout(async () => {
				if (value.trim().length === 0) {
					dispatch({
						type: 'CLEAN_QUERY',
						payload: null,
					})

					return
				}

				const results = fuse.search(value)

				const data = await searchByQuery(results)

				dispatch({
					type: 'FINISH_SEARCH',
					payload: {
						data,
						noResults: data.length === 0,
					},
				})
			}, 500)
		},
		[dispatch, fuse],
	)

	React.useEffect(() => {
		dispatch({
			type: 'CLEAN_QUERY',
			payload: null,
		})
	}, [dispatch, type])

	return (
		<div className='relative w-full max-w-3xl flex-1'>
			<label htmlFor='simple-search' className='sr-only'>
				Search tasks
			</label>
			<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
				{isLoading ? (
					<Spin className='text-gray-500 w-6 h-6' />
				) : (
					<IoSearchOutline className='w-6 h-6 stroke-gray-500' />
				)}
			</div>

			<Input
				placeholder='Search tasks'
				type='text'
				className='h-10 min-w-56 block w-full p-2.5 ps-10 border-gray-500 focus-visible:ring-transparent focus:border-green-500 text-white text-sm font-normal'
				id='simple-search'
				value={value}
				onChange={onQueryChange}
			/>
		</div>
	)
}
