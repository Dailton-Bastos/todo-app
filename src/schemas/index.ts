import * as z from 'zod'

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
)

export const registerSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(8).regex(passwordValidation),
})

export const loginSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
})

export const forgotSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
})

export const emailVerificationCodeSchema = z.object({
	email: z.string().email(),
	code: z.string(),
})
