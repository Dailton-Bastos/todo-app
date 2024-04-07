import { create } from 'zustand'

type Store = {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	twoFactorUri: string
	setTwoFactorUri: (twoFactorUri: string) => void
	twoFactorCode: string
	setTwoFactorCode: (twoFactorCode: string) => void
}

export const use2FAModal = create<Store>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
	twoFactorUri: '',
	setTwoFactorUri: (twoFactorUri: string) => set({ twoFactorUri }),
	twoFactorCode: '',
	setTwoFactorCode: (twoFactorCode: string) => set({ twoFactorCode }),
}))
