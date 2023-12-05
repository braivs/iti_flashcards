import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './recover-password.module.scss'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/Typography'

const schema = z.object({
  email: z.string().email(),
})

export type FormType = z.infer<typeof schema>

type Props = {
  onSubmit: (data: FormType) => void
}
export const RecoverPassword = (props: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography variant="Large" className={s.title}>
          Forgot your password?
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <div className={s.form}>
            <ControlledTextField
              placeholder={'Email'}
              name={'email'}
              control={control}
              type={'email'}
              label={'Email'}
            />
          </div>
          <Typography variant="Body_2" className={s.instructions}>
            Enter your email address and we will send you further instructions
          </Typography>
          <Button className={s.button} fullWidth type={'submit'}>
            Send Instructions
          </Button>
        </form>
        <Typography variant="Body_2" className={s.caption}>
          Did you remember your password?
        </Typography>
        <Button variant="link" className={s.loginLink} as={'a'} href={'/login'}>
          Try logging in
        </Button>
      </Card>
    </>
  )
}
