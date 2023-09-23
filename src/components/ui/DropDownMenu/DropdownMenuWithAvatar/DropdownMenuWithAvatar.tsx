import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './DropdownMenuWithAvatar.module.scss'

export type DropdownItemWithAvatarType = {
  children: ReactNode
  disabled?: boolean
  onSelect?: (event: Event) => void
  className?: string
  trigger?: ReactNode
}
export const DropdownItemWithAvatar: FC<DropdownItemWithAvatarType> = ({
  children,
  disabled,
  trigger,
}) => {
  return (
    <DropdownMenu.Item disabled={disabled} className={s.dropDownMenuItem}>
      <div className={s.userAvatar}>{trigger}</div>
      <div>{children}</div>
    </DropdownMenu.Item>
  )
}
