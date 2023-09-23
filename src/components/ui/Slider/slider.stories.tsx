import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Slider } from '@/components/ui/Slider/slider.tsx'

export default {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const SliderExample: Story = {
  render: args => {
    const [value, setValue] = useState([1, 12])

    return (
      <Slider
        {...args}
        value={value}
        onValueChange={setValue}
        step={1}
        defaultValue={value}
        min={1}
        max={12}
        minStepsBetweenThumbs={1}
      />
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
