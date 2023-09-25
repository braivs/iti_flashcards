import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { clsx } from 'clsx'

import { MoreVerticalOutline } from '@/assets/icons/MoreVerticalOutline.tsx'
import s from '@/components/ui/DropDownMenu/DropDownMenu.module.scss'

export type DropDownMenuType = {
  children: ReactNode
  trigger?: ReactNode
  align?: 'start' | 'center' | 'end'
  className?: string
}
export const DropDownMenu: FC<DropDownMenuType> = ({
  children,
  trigger = <MoreVerticalOutline color={'var(--color-light-100)'} />,
  align = 'end',
  className,
}) => {
  const classNames = {
    content: clsx(s.dropDownMenuContent, className),
    arrow: s.dropDownMenuArrow,
    trigger: clsx(s.button),
  }

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className={classNames.trigger}>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content avoidCollisions={true} align={align} className={classNames.content}>
          <DropdownMenu.Arrow width={15} height={8} className={classNames.arrow} />
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
