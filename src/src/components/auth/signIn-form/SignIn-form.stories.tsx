import type { Meta, StoryObj } from '@storybook/react'

import { SignUpForm } from '@/src/components/auth/signUp-form/signUp-form.tsx'

const meta = {
  title: 'Auth/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
