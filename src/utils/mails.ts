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
