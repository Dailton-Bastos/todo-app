import { client } from '@/trigger'
import { sendResetPasswordEmail } from '@/utils/mails'
import { eventTrigger } from '@trigger.dev/sdk'
import * as z from 'zod'

client.defineJob({
	id: 'email-reset-password-token',
	name: 'Send reset password token',
	version: '0.0.1',
	trigger: eventTrigger({
		name: 'email.reset.password.token',
		schema: z.object({
			email: z.string().email(),
			token: z.string(),
		}),
	}),
	run: async (payload, io) => {
		const { email, token } = payload

		await io.logger.info('Email reset password job is running')

		return io.try(
			() => {
				return io.runTask(
					'email-reset-password-token',
					async () => {
						await sendResetPasswordEmail({ email, token })

						await io.logger.info(
							'✨ Congratulations, email reset password successful send ✨',
						)

						return {
							status: 'success',
							message: 'Reset password email sent',
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
