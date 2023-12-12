import { FC } from 'react'

import { Link } from 'react-router-dom'

import s from './errorPage.module.scss'

import { Error404 } from '@/assets/images/404.tsx'
import { Button } from '@/components/ui/Button'
import { Typography } from '@/components/ui/Typography'

type Error = {
  errorMessage?: string
}
export const ErrorPage: FC<Error> = () => {
  return (
    <div className={s.errorWrapper}>
      <div className={s.errorImg}>
        <Error404 />
      </div>
      <div className={s.errorTitle}>
        <Typography variant={'Body_1'}>Sorry! Page not found!</Typography>
      </div>
      <div>
        <Link to={'/'}>
          <Button>Back to home page</Button>
        </Link>
      </div>
    </div>
  )
}
