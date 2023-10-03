import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import sC from '../../../styles/common.module.scss'

import { Pagination } from '@/components/ui/Pagination/Pagination.tsx'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => {
    // For Pagination:
    const totalCount = 4861 // should come from server api
    const [page, setPage] = useState(1)
    const values: Array<string> = ['5', '10', '20', '50', '100']
    const [value, setValue] = useState(values[0]) // for SuperSelect

    const updateCurrentPageCallback = (page: number | string) => {
      setPage(+page)
    }

    return (
      <div className={sC.storyContainer}>
        <Pagination
          {...args}
          onPageChange={updateCurrentPageCallback}
          totalCount={totalCount}
          currentPage={page}
          pageSize={+value}
          siblingCount={2}
          selectSettings={{
            value: value,
            onChangeOption: setValue,
            arr: values,
          }}
        />
      </div>
    )
  },
  args: {
    onPageChange: () => undefined,
    totalCount: 0,
    currentPage: 0,
    pageSize: 0,
    siblingCount: 0,
    selectSettings: {
      value: '0',
      onChangeOption: () => undefined,
      arr: [],
    },
  },
}
