import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import sC from '../../../common/commonStyles/common.module.scss'

import { Slider } from '@/components/ui/Slider/slider.tsx'
import { SliderSingle } from '@/components/ui/SliderSingle/SliderSingle.tsx'

export default {
  title: 'Components/SliderSingle',
  component: <SliderSingle />,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const SliderExample: Story = {
  render: args => {
    const [value, setValue] = useState([1, 12])

    return (
      <div className={sC.storyContainer}>
        <SliderSingle
          {...args}
          value={value}
          onValueChange={setValue}
          step={1}
          defaultValue={value}
          min={1}
          max={12}
          minStepsBetweenThumbs={1}
        />
      </div>
    )
  },
  args: {
    defaultValue: [1],
    value: [1, 10],
    onValueChange: () => {},
    step: 1,
    min: 1,
    max: 10,
    minStepsBetweenThumbs: 1,
  },
}

//todo: fix this story
