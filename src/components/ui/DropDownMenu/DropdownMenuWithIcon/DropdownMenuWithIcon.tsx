import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import s from './DropdownMenuWithIcon.module.scss'

import { DropdownItemWithAvatarType } from '@/components/ui/DropDownMenu/DropdownMenuWithAvatar/DropdownMenuWithAvatar.tsx'
import { Typography } from '@/components/ui/Typography'

export type DropdownMenuWithIconType = Omit<DropdownItemWithAvatarType, 'children'> & {
  icon: ReactNode
  title: string
} & ComponentPropsWithoutRef<'div'>
export const DropdownItemWithIcon: FC<DropdownMenuWithIconType> = ({
  icon,
  title,
  className,
  onSelect,
  disabled,
  ...rest
}) => {
  const classNames = {
    container: clsx(s.dropDownMenuItem),
    title: clsx(className),
  }

  return (
    <DropdownMenu.Item
      className={classNames.container}
      disabled={disabled}
      onSelect={onSelect}
      {...rest}
    >
      {icon}
      <Typography variant={'Caption'} className={classNames.title}>
        {title}
      </Typography>
    </DropdownMenu.Item>
  )
}
