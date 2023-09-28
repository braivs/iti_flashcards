import { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher, TabSwitcherValuesType } from '@/components/ui/TabSwitcher/TabSwitcher.tsx'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
    isDisabled: {
      options: [true, false],
    },
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    const onChange = (value: string) => {
      console.log(`Selected tab 111: ${value}`)
    }

    const valuesArr: Array<TabSwitcherValuesType> = [
      { index: 1, value: 'tab1', text: 'Switcher 1' },
      { index: 2, value: 'tab2', text: 'Switcher 2' },
      { index: 3, value: 'tab3', text: 'Switcher 3' },
    ]

    return (
      <TabSwitcher {...args} values={valuesArr} onChangeCallback={onChange} defaultValue={'tab1'} />
    )
  },

  args: {
    values: [],
    onChangeCallback: () => {},
    isDisabled: false,
  },
}
