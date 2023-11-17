import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import sC from '../../../common/commonStyles/common.module.scss'

import { Select } from './Select.tsx'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      options: [true, false],
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const [value, setValue] = useState('Select-box')
    const arr: Array<string> = ['value 1', 'value 2', 'value 3']

    return (
      <div className={sC.storyContainer}>
        <Select {...args} options={arr} value={value} onChangeOption={setValue} label={'label'} />
      </div>
    )
  },

  args: {
    isDisabled: false,
    value: '',
    onChangeOption: () => {},
    options: [],
  },
}
