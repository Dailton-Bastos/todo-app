import { Box } from '@/components/Box'
import { Sidebar } from '@/components/Sidebar'
import { ModalProvider } from '@/providers/modalProvider'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const font = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
	title: 'Todo App',
	description: 'Create easy tasks',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={font.className}>
				<div className='flex h-full w-full'>
					<div className='bg-black h-full w-80 p-2'>
						<Sidebar />
					</div>

					<main className='h-full flex-1 py-2 pr-2'>
						<Box className='w-full h-full rounded-lg overflow-hidden border-none py-10 px-8'>
							{children}
						</Box>
					</main>
				</div>

				<ModalProvider />
			</body>
		</html>
	)
}
