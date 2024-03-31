import { emailVerificationCodeSchema } from '@/schemas'
import { client } from '@/trigger'
import { sendEmailVerificationCodeEmail } from '@/utils/mails'
import { eventTrigger } from '@trigger.dev/sdk'

client.defineJob({
	id: 'email-verification-code',
	name: 'Send email verification code',
	version: '0.0.1',
	trigger: eventTrigger({
		name: 'email.verification.code',
		schema: emailVerificationCodeSchema,
	}),
	run: async (payload, io) => {
		const { email, code } = payload

		await io.logger.info('Email verification code job is running')

		return io.try(
			() => {
				return io.runTask(
					'email-verification-code',
					async () => {
						await sendEmailVerificationCodeEmail({ email, code })

						await io.logger.info(
							'✨ Congratulations, email verification code successful send ✨',
						)
						return {
							status: 'success',
							message: 'Confirmation email sent',
						}
					},
					{
						retry: {
							limit: 3,
							factor: 2,
							minTimeoutInMs: 1000,
						},
					},
				)
			},
			async () => {
				await io.logger.error(
					'There was a problem to run email verification job',
				)

				return {
					status: 'error',
					message: 'Oops, something went wrong!',
				}
			},
		)
	},
})
