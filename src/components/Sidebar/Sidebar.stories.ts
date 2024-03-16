import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from '.'

type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
	args: {
		primary: true,
	},
}

export const LoggedIn: Story = {}

export const UserWithoutAvatar: Story = {}
export const UserOnlyEmail: Story = {}

const meta: Meta<typeof Sidebar> = { component: Sidebar }

export default meta
