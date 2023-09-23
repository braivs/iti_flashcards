import type { Meta, StoryObj } from '@storybook/react'

import { CreateNewPassword } from '@/components/auth/create-new-password/create-new-password.tsx'

const meta = {
  title: 'Auth/Create New Password',
  component: CreateNewPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (data: any) => console.info(data),
  },
}
