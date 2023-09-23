import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './index.ts'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'Large',
        'H1',
        'H2',
        'H3',
        'Body_1',
        'Body_2',
        'Subtitle_1',
        'Subtitle_2',
        'Caption',
        'Overline',
        'Link_1',
        'Link_2',
      ],
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

const childrenText = `Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH`

export const Large: Story = {
  args: {
    variant: 'Large',
    children: childrenText,
  },
}
export const H1: Story = {
  args: {
    variant: 'H1',
    children: childrenText,
  },
}
export const H3: Story = {
  args: {
    variant: 'H3',
    children: childrenText,
  },
}
export const Body_1: Story = {
  args: {
    variant: 'Body_1',
    children: childrenText,
  },
}
export const Body_2: Story = {
  args: {
    variant: 'Body_2',
    children: childrenText,
  },
}
export const Subtitle_1: Story = {
  args: {
    variant: 'Subtitle_1',
    children: childrenText,
  },
}
export const Subtitle_2: Story = {
  args: {
    variant: 'Subtitle_2',
    children: childrenText,
  },
}
export const Caption: Story = {
  args: {
    variant: 'Caption',
    children: childrenText,
  },
}
export const Overline: Story = {
  args: {
    variant: 'Overline',
    children: childrenText,
  },
}
export const Link_1: Story = {
  args: {
    variant: 'Link_1',
    children: childrenText,
  },
}
export const Link_2: Story = {
  args: {
    variant: 'Link_2',
    children: childrenText,
  },
}
