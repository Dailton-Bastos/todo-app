const path = require('path')

const buildEslintCommand = (filenames) => {
	const lintOptions =
		'next lint --fix --max-warnings=0 --config .eslintrc.config.json'

	if (filenames.length > 10) return `${lintOptions} .`

	const cwd = process.cwd()
	const relativePaths = filenames.map((file) => path.relative(cwd, file))

	return `${lintOptions} --file ${relativePaths.join(' --file ')}`
}

const buildPrettierCommand = 'prettier --write --ignore-unknown'

module.exports = {
	'!(.lintstagedrc.js)*.{js,ts,tsx}': [
		buildEslintCommand,
		buildPrettierCommand,
	],
	'*.{md,json}': [buildPrettierCommand],
}
