export type SearchReducerState = {
	value: string
	isLoading: boolean
	noResults: boolean | null
	data: Array<unknown>
	dispatch: (args: SearchReducerAction) => void
}

export type SearchReducerAction =
	| {
			type: 'START_SEARCH'
			payload: string
	  }
	| {
			type: 'FINISH_SEARCH'
			payload: {
				data: Array<unknown>
				noResults: boolean
			}
	  }
	| {
			type: 'CLEAN_QUERY'
			payload: null
	  }

export function searchReducer(
	state: SearchReducerState,
	action: SearchReducerAction,
): SearchReducerState {
	switch (action.type) {
		case 'START_SEARCH':
			return {
				...state,
				isLoading: true,
				value: action.payload,
			}

		case 'FINISH_SEARCH':
			return {
				...state,
				isLoading: false,
				data: action.payload.data,
				noResults: action.payload.noResults,
			}

		case 'CLEAN_QUERY':
			return {
				...state,
				value: '',
				isLoading: false,
				noResults: null,
				data: [],
			}

		default:
			return state
	}
}
