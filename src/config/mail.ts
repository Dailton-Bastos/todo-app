import * as SMTPTransport from 'nodemailer/lib/smtp-transport'

export const mailConfig: SMTPTransport.Options = {
	host: process.env.MAIL_HOST,
	port: Number(process.env.MAIL_PORT),
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
	from: 'ToDo <noreplay@todo.com>',
}
