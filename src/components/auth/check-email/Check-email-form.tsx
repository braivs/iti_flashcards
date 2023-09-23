import { clsx } from 'clsx'

import { Typography } from '../../ui/Typography'

import s from './Check-email-form.module.scss'

import { EmailImage } from '@/assets/images/EmailImage'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

type CheckEmailFormType = {
  userMail: string
}
export const CheckEmailForm = (props: CheckEmailFormType) => {
  const formClassNames = {
    header: clsx(s.header),
    information: clsx(s.information),
    img: clsx(s.img),
    cardStyle: clsx(s.cardWrapper),
  }

  return (
    <Card className={formClassNames.cardStyle}>
      <Typography variant={'Large'} className={formClassNames.header}>
        Check Email
      </Typography>
      <EmailImage className={formClassNames.img} />
      <Typography variant={'Body_2'} className={formClassNames.information}>
        We’ve sent an Email with instructions to
        <Typography variant={'Body_2'}>{props.userMail} </Typography>
      </Typography>
      <Button variant={'primary'} as={'a'} fullWidth={true}>
        {'Back to Sign In'}
      </Button>
    </Card>
  )
}
