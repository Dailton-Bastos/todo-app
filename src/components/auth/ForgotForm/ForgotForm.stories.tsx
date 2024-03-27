import type { Meta, StoryObj } from '@storybook/react'

import { ForgotForm } from '.'

type Story = StoryObj<typeof ForgotForm>

export const Default: Story = {
	args: {
		primary: true,
	},
}

const meta: Meta<typeof ForgotForm> = { component: ForgotForm }

export default meta
