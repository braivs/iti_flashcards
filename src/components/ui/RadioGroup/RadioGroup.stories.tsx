import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import sC from '../../../styles/common.module.scss'

import { RadioElementType, RadioGroup } from './RadioGroup.tsx'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      options: [true, false],
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const arr: RadioElementType[] = [
      { id: 'r1', value: 'default', label: 'Default' },
      { id: 'r2', value: 'comfortable', label: 'Comfortable' },
      { id: 'r3', value: 'compact', label: 'Compact' },
    ]
    const [value, setValue] = useState(arr[0].value)

    return (
      <div className={sC.storyContainer}>
        <RadioGroup {...args} options={arr} onValueChange={setValue} value={value} />
      </div>
    )
  },
  args: {
    value: '',
    onValueChange: () => undefined,
    options: [],
  },
}
