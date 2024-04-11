import React from 'react'

export const useProgress = ({ value }: { value: number }) => {
	const [isRunning, setIsRunning] = React.useState(true)
	const [progress, setProgress] = React.useState(10)

	const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()

	React.useEffect(() => {
		if (isRunning) {
			timeoutRef.current = setInterval(() => {
				setProgress((prev) => prev - 1)
			}, 1000)
		} else {
			clearInterval(timeoutRef.current)
		}

		return () => clearInterval(timeoutRef.current)
	}, [isRunning])

	React.useEffect(() => {
		if (progress === 0) {
			setIsRunning(false)

			clearInterval(timeoutRef.current)
		}
	}, [progress])

	React.useEffect(() => {
		setProgress(value > 100 ? 100 : value < 0 ? 0 : value)
	}, [value])

	return { progress }
}
