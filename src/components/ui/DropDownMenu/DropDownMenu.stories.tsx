import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Meta, StoryObj } from '@storybook/react'

import s from './DropDownMenu.module.scss'

import { Edit } from '@/assets/icons/Edit'
import { Logout } from '@/assets/icons/Logout.tsx'
import { Person } from '@/assets/icons/Person.tsx'
import { Play } from '@/assets/icons/Play.tsx'
import { TrashHollow } from '@/assets/icons/TrashHollow'
import { Avatar } from '@/components/ui/Avatar/Avatar.tsx'
import { DropDownMenu } from '@/components/ui/DropDownMenu/DropDownMenu.tsx'
import { DropdownItemWithAvatar } from '@/components/ui/DropDownMenu/DropdownMenuWithAvatar/DropdownMenuWithAvatar.tsx'
import { DropdownItemWithIcon } from '@/components/ui/DropDownMenu/DropdownMenuWithIcon'
import { Typography } from '@/components/ui/Typography'

const meta = {
  title: 'Components/DropdownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropDownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const WithUserAvatar: Story = {
  render: args => {
    return <DropDownMenu {...args} />
  },
  args: {
    trigger: (
      <Avatar
        urlAdress={
          'https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=826&t=st=1693944282~exp=1693944882~hmac=db975532c35e66aee49662f13349eb1ca1eab57963a6931222633c594a4f5a90'
        }
      />
    ),
    align: 'center',
    children: (
      <div className={s.container}>
        <DropdownItemWithAvatar
          trigger={
            <Avatar
              urlAdress={
                'https://img.freepik.com/free-vector/cute-cat-gaming-cartoon_138676-2969.jpg?w=826&t=st=1693944282~exp=1693944882~hmac=db975532c35e66aee49662f13349eb1ca1eab57963a6931222633c594a4f5a90'
              }
            />
          }
        >
          <Typography variant={'Subtitle_2'} className={s.userName}>
            Alex
          </Typography>
          <Typography variant={'Caption'} className={s.userEmail}>
            dododododod@gmail.com
          </Typography>
        </DropdownItemWithAvatar>
        <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
        <DropdownItemWithIcon
          icon={<Person color={'var(--color-light-100)'} className={s.icons} />}
          className={s.dropDownMenuItem}
          title={'My Profile'}
        />
        <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
        <DropdownItemWithIcon
          icon={<Logout color={'var(--color-light-100)'} className={s.icons} />}
          title={'Sign Out'}
        />
      </div>
    ),
    className: '',
  },
}

export const WithIcon: Story = {
  render: args => {
    return <DropDownMenu {...args} />
  },
  args: {
    trigger: undefined,
    align: 'end',
    className: '',
    children: (
      <div className={s.container}>
        <DropdownItemWithIcon
          title={'Learn'}
          icon={<Play color={'var(--color-light-100)'} className={s.icons} />}
        />
        <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
        <DropdownItemWithIcon
          icon={<Edit color={'var(--color-light-100)'} className={s.icons} />}
          title={'Edit'}
        />
        <DropdownMenu.Separator className={s.dropDownMenuSeparator} />
        <DropdownItemWithIcon
          icon={<TrashHollow color={'var(--color-light-100)'} className={s.icons} />}
          title={'Delete'}
        />
      </div>
    ),
  },
}
