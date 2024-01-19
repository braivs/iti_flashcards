import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './Typography.module.scss'

export const Typography = <T extends ElementType = 'p'>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const classNames = clsx(s.text, s[props.variant], props.className)
  const Component = props.as || 'div'

  const tagSelector = () => {
    switch (props.variant) {
      case 'H1':
        return <h1 className={clsx(props.className, s[props.variant])}>{props.children}</h1>
      case 'H2':
        return <h2 className={clsx(props.className, s[props.variant])}>{props.children}</h2>
      case 'H3':
        return <h3 className={clsx(props.className, s[props.variant])}>{props.children}</h3>
      default:
        return <div className={clsx(props.className, s[props.variant])}>{props.children}</div>
    }
  }

  return props.as ? (
    <Component className={classNames}>{props.children}</Component>
  ) : (
    <>{tagSelector()}</>
  )
}

type Props<T extends ElementType> = {
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
