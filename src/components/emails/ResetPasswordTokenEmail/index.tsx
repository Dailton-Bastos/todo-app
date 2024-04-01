import React from 'react'

import { RootLayoutEmail } from '@/components/emails/_components/Layout'
import { baseUrl } from '@/config/baseUrl'
import { Section, Text, Heading, Link } from '@react-email/components'

import * as styles from './styles'

type Props = {
	token: string
}

const ResetPasswordTokenEmail = ({ token }: Props) => {
	return (
		<RootLayoutEmail preview='Your token password email link'>
			<Section>
				<Heading style={styles.heading}>Reset your password</Heading>

				<Text style={styles.text}>Your reset password link is below</Text>

				<Section style={styles.buttonContainer}>
					<Link
						href={`${baseUrl}/auth/reset-password?token=${token}`}
						style={styles.button}
					>
						Reset password
					</Link>
				</Section>

				<Text style={styles.text}>
					This link and token will only be valid for the next 02 hours.
				</Text>
				<Text style={styles.text}>
					If you didn&apos;t request this email, there&apos;s nothing to worry
					about, you can safely ignore it.
				</Text>
			</Section>
		</RootLayoutEmail>
	)
}

ResetPasswordTokenEmail.PreviewProps = {
	token: 'ykhbl9hnhtsla9psx8fyqkf6han6vmra1ov0qgnd',
} as Props

export default ResetPasswordTokenEmail
