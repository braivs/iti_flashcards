import { Meta, StoryObj } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import { CheckEmailForm } from './Check-email-form.tsx'

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmailForm,
  tags: ['autodocs'],
  decorators: [withRouter],
} satisfies Meta<typeof CheckEmailForm>

export default meta

type Story = StoryObj<typeof meta>

export const CheckEmailGoogleForm: Story = {
  args: {
    userMail: 'google.com',
  },
}
