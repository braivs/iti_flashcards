import { FC } from 'react'

import { clsx } from 'clsx'

import s from './Avatar.module.scss'
export type UserAvatarType = {
  urlAdress: string
  className?: string
}

export const Avatar: FC<UserAvatarType> = ({ urlAdress, className }) => {
  const classNames = {
    imgStyle: clsx(s.userAvatar, className),
  }

  return <img src={urlAdress} alt="userAvatar" className={classNames.imgStyle} />
}
