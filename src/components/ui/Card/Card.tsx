import { ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './Card.module.scss'

export const Card = (props: Props) => {
  return <div className={clsx(s.component, props.className)}>{props.children}</div>
}

type Props = {
  children: ReactNode
  className?: string
}
