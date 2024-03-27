import type { Meta, StoryObj } from '@storybook/react'

import { RegisterForm } from '.'

type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {
	args: {
		primary: true,
	},
}

const meta: Meta<typeof RegisterForm> = { component: RegisterForm }

export default meta
