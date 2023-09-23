import { Meta, StoryObj } from '@storybook/react'

import { CheckEmailForm } from './Check-email-form.tsx'

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmailForm,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckEmailForm>

export default meta

type Story = StoryObj<typeof meta>

export const CheckEmailGoogleForm: Story = {
  args: {
    userMail: 'google.com',
  },
}
