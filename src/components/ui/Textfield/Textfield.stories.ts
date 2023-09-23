import { Meta, StoryObj } from '@storybook/react'

import { Textfield } from './index.ts'

// eslint-disable-next-line storybook/story-exports
const meta = {
  title: 'Components/Textfield',
  component: Textfield,
  tags: ['autodocs'],
} satisfies Meta<typeof Textfield>

export default meta

type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    type: 'text',
    label: 'Input text',
  },
}
export const Password: Story = {
  args: {
    type: 'password',
    label: 'Input Pasword',
  },
}
export const Search: Story = {
  args: {
    type: 'search',
  },
}

export const ErrorText: Story = {
  args: {
    type: 'text',
    label: 'Input search',
    errorMessage: 'Text error!',
  },
}

export const ErrorSearch: Story = {
  args: {
    type: 'search',
    label: 'Input search',
    errorMessage: 'Incorrect request!',
  },
}

export const ErrorPassword: Story = {
  args: {
    type: 'password',
    label: 'Input search',
    errorMessage: 'Incorrect password!',
  },
}
export const DisabledText: Story = {
  args: {
    type: 'text',
    label: 'Disabled search',
    disabled: true,
  },
}
export const DisabledPassword: Story = {
  args: {
    type: 'password',
    label: 'Disabled password',
    disabled: true,
  },
}
export const DisabledSearch: Story = {
  args: {
    type: 'search',
    label: 'Disabled search',
    disabled: true,
  },
}
