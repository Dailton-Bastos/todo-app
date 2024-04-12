import { searchReducer } from '@/reducers/searchReducer'
import type { SearchReducerState } from '@/reducers/searchReducer'
import { create } from 'zustand'

export const useSearch = create<SearchReducerState>((set) => ({
	value: '',
	isLoading: false,
	noResults: null,
	data: [],
	dispatch: (args) => set((state) => searchReducer(state, args)),
}))
