import { client } from '@/trigger'
import { sendNotifyPasswordUpdatedEmail } from '@/utils/mails'
import { eventTrigger } from '@trigger.dev/sdk'
import * as z from 'zod'

client.defineJob({
	id: 'notify-password-updated',
	name: 'Send password updated notify',
	version: '0.0.1',
	trigger: eventTrigger({
		name: 'email.notify.password.updated',
		schema: z.object({
			email: z.string().email(),
		}),
	}),
	run: async (payload, io) => {
		const { email } = payload

		await io.logger.info('Email notify password updated job is running')

		return io.try(
			() => {
				return io.runTask(
					'notify-password-updated',
					async () => {
						await sendNotifyPasswordUpdatedEmail({ email })

						await io.logger.info(
							'✨ Congratulations, email notify password successful send ✨',
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
