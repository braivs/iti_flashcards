import type { Meta, StoryObj } from '@storybook/react'

import { RecoverPassword } from '@/components/auth/recover-password/recover-password.tsx'

const meta = {
  title: 'Auth/Recover password',
  component: RecoverPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof RecoverPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (data: any) => console.info(data),
  },
}
