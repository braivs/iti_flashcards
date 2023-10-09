import { clsx } from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

import { Typography } from '../../ui/Typography'

import s from './Check-email-form.module.scss'

import { EmailImage } from '@/assets/images/EmailImage'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export const CheckEmailForm = () => {
  const navigate = useNavigate()

  const formClassNames = {
    header: clsx(s.header),
    information: clsx(s.information),
    img: clsx(s.img),
    cardStyle: clsx(s.cardWrapper),
  }

  const { state } = useLocation()
  const { email } = state

  return (
    <Card className={formClassNames.cardStyle}>
      <Typography variant={'Large'} className={formClassNames.header}>
        Check Email
      </Typography>
      <EmailImage className={formClassNames.img} />
      <Typography variant={'Body_2'} className={formClassNames.information}>
        We’ve sent an Email with instructions to
        <Typography variant={'Body_2'}>{email} </Typography>
      </Typography>
      <Button
        variant="primary"
        fullWidth={true}
        className={s.loginLink}
        onClick={() => navigate('/login')}
      >
        Back to Sign In
      </Button>
    </Card>
  )
}
