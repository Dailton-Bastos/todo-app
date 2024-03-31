import { create } from 'zustand'

type AuthForm = 'login' | 'register' | 'forgot'

type Store = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	activeAuthForm: AuthForm
	setActiveAuthForm: (type: AuthForm) => void
}

export const useAuthModal = create<Store>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	activeAuthForm: 'login',
	setActiveAuthForm: (type: AuthForm) => set({ activeAuthForm: type }),
}))
