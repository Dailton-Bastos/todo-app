export const middleware = () => {}

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api(?!/trigger)|trpc)(.*)'],
}
