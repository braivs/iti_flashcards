import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './Typography.module.scss'

export const Typography = <T extends ElementType = 'p'>(
  props: PropsType<T> & Omit<ComponentPropsWithoutRef<T>, keyof PropsType<T>>
) => {
  const tagSelector = () => {
    switch (props.variant) {
      case 'H1':
        return <h1 className={clsx(props.className, s[props.variant])}>{props.children}</h1>
      case 'H2':
        return <h2 className={clsx(props.className, s[props.variant])}>{props.children}</h2>
      case 'H3':
        return <h2 className={clsx(props.className, s[props.variant])}>{props.children}</h2>
      default:
        return <div className={clsx(props.className, s[props.variant])}>{props.children}</div>
    }
  }

  return <>{tagSelector()}</>
}

type PropsType<T extends ElementType> = {
  as?: T
  variant:
    | 'Large'
    | 'H1'
    | 'H2'
    | 'H3'
    | 'Body_1'
    | 'Subtitle_1'
    | 'Body_2'
    | 'Subtitle_2'
    | 'Caption'
    | 'Overline'
    | 'Link_1'
    | 'Link_2'
  children: ReactNode
  className?: string
}
