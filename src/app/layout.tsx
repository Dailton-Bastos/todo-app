import { Box } from '@/components/Box'
import { Sidebar } from '@/components/Sidebar'
import { ModalProvider } from '@/providers/modalProvider'
import { SessionProvider } from '@/providers/sessionProvider'
import { ToasterProvider } from '@/providers/toasterProvider'
import { validateRequest } from '@/utils/session'
import { TriggerProvider } from '@trigger.dev/react'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const font = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
	title: 'Todo App',
	description: 'Create easy tasks',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const { session, user } = await validateRequest()

	const publicApiKey = process.env.NEXT_PUBLIC_TRIGGER_PUBLIC_API_KEY ?? ''
	const apiUrl = process.env.NEXT_PUBLIC_TRIGGER_API_URL ?? ''

	return (
		<html lang='en'>
			<body className={font.className}>
				<SessionProvider session={session} user={user}>
					<TriggerProvider publicApiKey={publicApiKey} apiUrl={apiUrl}>
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
						<ToasterProvider />
					</TriggerProvider>
				</SessionProvider>
			</body>
		</html>
	)
}
