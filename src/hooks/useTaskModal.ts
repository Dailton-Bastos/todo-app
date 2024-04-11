import { create } from 'zustand'

type ActiveFormType = 'create' | 'update'

type Store = {
	isOpen: boolean
	activeForm: ActiveFormType
	setActiveForm: (type: ActiveFormType) => void
	onOpen: () => void
	onClose: () => void
}

export const useTaskModal = create<Store>((set) => ({
	isOpen: false,
	activeForm: 'create',
	setActiveForm: (type: ActiveFormType) => set({ activeForm: type }),
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}))
