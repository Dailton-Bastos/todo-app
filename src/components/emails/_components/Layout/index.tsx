import React from 'react'

import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Text,
	Hr,
} from '@react-email/components'

import * as styles from './styles'

type Props = {
	children: React.ReactNode
	preview?: string
}

export const RootLayoutEmail = ({ children, preview = '' }: Props) => {
	return (
		<Html>
			<Head />

			<Preview>{preview}</Preview>

			<Body style={styles.main}>
				<Container style={styles.container}>
					{children}

					<Hr style={styles.hr} />
					<Text style={styles.copy}>ToDo</Text>
					<Text style={styles.reserved}>All rights reserved.</Text>
				</Container>
			</Body>
		</Html>
	)
}
