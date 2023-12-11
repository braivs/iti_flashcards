import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import sC from '../../../common/commonStyles/common.module.scss'

import { SliderSingle } from '@/components/ui/SliderSingle/SliderSingle.tsx'

export default {
  title: 'Components/SliderSingle',
  component: SliderSingle,
  tags: ['autodocs'],
} satisfies Meta<typeof SliderSingle>

type Story = StoryObj<typeof SliderSingle>

export const SliderExample: Story = {
  render: args => {
    const [value, setValue] = useState([4, 15])

    return (
      <div className={sC.storyContainer}>
        <SliderSingle
          {...args}
          value={value[0]}
          onValueChange={setValue}
          step={1}
          defaultValue={value[0]}
          min={1}
          max={12}
          minStepsBetweenThumbs={1}
        />
      </div>
    )
  },
  args: {
    defaultValue: 0,
    value: 0,
    onValueChange: () => {},
    step: 1,
    min: 1,
    max: 10,
    minStepsBetweenThumbs: 1,
  },
}
