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

export const resetPasswordSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
})

export const newPasswordSchema = z
	.object({
		password: z.string().min(8).regex(passwordValidation),
		confirmPassword: z.string(),
	})
	.refine(
		(data) => {
			return data.password === data.confirmPassword
		},
		{
			message: 'Passwords does not match',
			path: ['confirmPassword'],
		},
	)

export const profileSchema = z.object({
	name: z.optional(z.string()),
	email: z.optional(z.string().email()),
	imageUrl: z.optional(z.string()),
	isTwoFactorEnabled: z.optional(z.boolean()),
})
