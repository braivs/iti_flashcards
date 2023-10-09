import { Meta, StoryObj } from '@storybook/react'

import { AvatarRadix } from './AvatarRadix'

const meta = {
  title: 'Components/AvatarRadix',
  component: AvatarRadix,
  tags: ['autodocks'],
  argTypes: {},
} satisfies Meta<typeof AvatarRadix>

export default meta

type Story = StoryObj<typeof meta>

export const Avatar: Story = {
  args: {
    urlAdress:
      'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
    userName: 'Jason',
  },
}

export const NoAvatar: Story = {
  args: {
    urlAdress: '',
    userName: 'Jason',
  },
}
