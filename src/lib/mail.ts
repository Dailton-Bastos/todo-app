import { mailConfig } from '@/config/mail'
import { createTransport } from 'nodemailer'

export const sendMail = async ({
	to,
	subject,
	body,
}: {
	to: string
	subject: string
	body: string
}) => {
	const transport = createTransport({ ...mailConfig })

	await transport.sendMail({
		to,
		subject,
		html: body,
		from: mailConfig.from,
	})
}
