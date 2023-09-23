import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './recover-password.module.scss'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Textfield } from '@/components/ui/Textfield'
import { Typography } from '@/components/ui/Typography'

const schema = z.object({
  email: z.string().email(),
})

type FormType = z.infer<typeof schema>

export const RecoverPassword = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: FormType) => {
    console.log(data)
  }

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography variant="Large" className={s.title}>
          Forgot your password?
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.form}>
            <Textfield
              {...register('email')}
              errorMessage={errors.email?.message}
              label={'email'}
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
        <Button variant="link" className={s.loginLink}>
          Try logging in
        </Button>
      </Card>
    </>
  )
}
