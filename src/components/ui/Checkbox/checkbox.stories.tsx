import { Meta } from '@storybook/react'

import { Checkbox } from './checkbox.tsx'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export const WithoutLabel = {
  args: {
    disabled: false,
  },
}
export const WithLabel = {
  args: {
    label: 'Check-box',
    disabled: false,
  },
}
