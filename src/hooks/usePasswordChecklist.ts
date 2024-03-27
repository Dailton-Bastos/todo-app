import React from 'react'

export const usePasswordChecklist = () => {
	const [rules, setRules] = React.useState({
		lower: false,
		upper: false,
		number: false,
		special: false,
		length: false,
	})

	const regex = React.useMemo(
		() => ({
			lower: new RegExp('(?=.*[a-z])'),
			upper: new RegExp('(?=.*[A-Z])'),
			number: new RegExp('(?=.*[0-9])'),
			special: new RegExp('(?=.*[!@#$%^&*])'),
			length: new RegExp('(?=.{8,})'),
		}),
		[],
	)

	const checkPasswordRules = React.useCallback(
		(password: string) => {
			setRules((prev) => ({
				...prev,
				lower: regex.lower.test(password),
				upper: regex.upper.test(password),
				number: regex.number.test(password),
				special: regex.special.test(password),
				length: regex.length.test(password),
			}))
		},
		[regex],
	)

	const passwordChecked = Object.values(rules).every((rule) => rule)

	return { rules, passwordChecked, checkPasswordRules }
}
