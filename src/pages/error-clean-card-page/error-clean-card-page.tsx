import { FC } from 'react'

import { Link } from 'react-router-dom'

import s from './error-clean-card-page.module.scss'

import { Zero } from '@/assets/images/0_Cards.tsx'
import { Button } from '@/components/ui/Button'

type ErrorCleanCardPageType = {}
export const ErrorCleanCardPage: FC<ErrorCleanCardPageType> = () => {
  return (
    <div className={s.wrapper}>
      <Zero />
      <div className={s.title}>This pack is empty!</div>
      <div>
        <Link to={'/'}>
          <Button>Back to decks page</Button>
        </Link>
      </div>
    </div>
  )
}
