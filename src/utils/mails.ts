import ResetPasswordTokenEmail from '@/components/emails/ResetPasswordTokenEmail'
import VerificationCodeEmail from '@/components/emails/VerificationCodeEmail'
import { sendMail } from '@/lib/mail'
import { render } from '@react-email/render'

export const sendEmailVerificationCodeEmail = async ({
	email,
	code,
}: {
	email: string
	code: string
}) => {
	const emailHtml = render(VerificationCodeEmail({ code }))

	await sendMail({
		to: email,
		body: emailHtml,
		subject: 'Confirm your email',
	})
}

export const sendResetPasswordEmail = async ({
	email,
	token,
}: {
	email: string
	token: string
}) => {
	const emailHtml = render(ResetPasswordTokenEmail({ token }))

	await sendMail({
		to: email,
		body: emailHtml,
		subject: 'Reset your password',
	})
}
