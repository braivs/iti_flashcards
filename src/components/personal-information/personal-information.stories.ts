import { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from '@/components/personal-information/personal-information.tsx'

const meta = {
  title: 'Personal/PersonalInformationForm',
  component: PersonalInformation,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInformationForm: Story = {
  args: {
    userName: 'Cards',
  },
}
