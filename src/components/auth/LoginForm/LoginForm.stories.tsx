import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm } from '.'

type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
	args: {
		primary: true,
	},
}

const meta: Meta<typeof LoginForm> = { component: LoginForm }

export default meta
