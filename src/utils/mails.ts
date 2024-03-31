import { sendMail } from '@/lib/mail'

export const sendEmailVerificationCodeEmail = async ({
	email,
	code,
}: {
	email: string
	code: string
}) => {
	await sendMail({
		to: email,
		body: `Your code is: ${code}`,
		subject: 'Confirm your email',
	})
}
