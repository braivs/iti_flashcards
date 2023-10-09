import { FC } from 'react'

import * as Avatar from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

import s from './AvatarRadix.module.scss'

export type UserAvatarRadixType = {
  urlAdress: string
  className?: string
  userName?: string
}
export const AvatarRadix: FC<UserAvatarRadixType> = ({ urlAdress, className, userName }) => {
  const name = userName?.slice(0, 1)
  const classNames = {
    imgStyle: clsx(s.AvatarRoot, className),
  }

  return (
    <div className={className}>
      <Avatar.Root className={classNames.imgStyle}>
        <Avatar.Image src={urlAdress} alt={'userAvatar'} className={s.AvatarImage} />
        <Avatar.Fallback className={s.AvatarFallback}>{name}</Avatar.Fallback>
      </Avatar.Root>{' '}
    </div>
  )
}
