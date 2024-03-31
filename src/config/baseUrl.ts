export const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: process.env.NEXT_PUBLIC_APP_URL_DEV
