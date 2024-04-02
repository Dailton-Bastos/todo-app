import React from 'react'

import { RootLayoutEmail } from '@/components/emails/_components/Layout'
import { Section, Text, Heading } from '@react-email/components'

import * as styles from './styles'

const UpdatedPasswordEmail = () => {
	return (
		<RootLayoutEmail preview='Updated the account password'>
			<Section>
				<Heading style={styles.heading}>Updated password confirmation</Heading>

				<Text style={styles.text}>Hi,</Text>

				<Text style={styles.text}>
					You updated the password for your account. If this was you, then no
					further action is required.
				</Text>

				<Text style={styles.text}>
					However if you did NOT perform this password change, please reset your
					account password immediately.
				</Text>
			</Section>
		</RootLayoutEmail>
	)
}

export default UpdatedPasswordEmail
