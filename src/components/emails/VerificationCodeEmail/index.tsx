import React from 'react'

import { RootLayoutEmail } from '@/components/emails/_components/Layout'
import { baseUrl } from '@/config/baseUrl'
import { Section, Text, Heading, Link } from '@react-email/components'

import * as styles from './styles'

type Props = {
	code: string
}

const VerificationCodeEmail = ({ code }: Props) => {
	return (
		<RootLayoutEmail preview='Your verification email link'>
			<Section>
				<Heading style={styles.heading}>Confirm your email</Heading>

				<Text style={styles.text}>
					We want to make sure it&apos;s really you.
				</Text>

				<Section style={styles.buttonContainer}>
					<Link
						href={`${baseUrl}/auth/verify-email?code=${code}`}
						style={styles.button}
					>
						Confirm email
					</Link>
				</Section>

				<Text style={styles.text}>
					This link and code will only be valid for the next 15 minutes.
				</Text>
				<Text style={styles.text}>
					If you didn&apos;t request this email, there&apos;s nothing to worry
					about, you can safely ignore it.
				</Text>
			</Section>
		</RootLayoutEmail>
	)
}

VerificationCodeEmail.PreviewProps = {
	code: 'T1H5039R',
} as Props

export default VerificationCodeEmail
