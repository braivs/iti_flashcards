import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button.tsx'
import { Card } from '../../ui/Card'
import { Textfield } from '../../ui/Textfield'
import { Typography } from '../../ui/Typography'

import sC from '@/styles/formStyles.module.scss'

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirm: z.string().min(6),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

type FormValues = z.input<typeof schema>

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={sC.outerContainer}>
        <Card className={sC.card}>
          <DevTool control={control} />
          <Typography variant={'H1'} className={sC.center}>
            Sign Up
          </Typography>
          <div className={sC.values}>
            <div className={sC.element}>
              <Textfield
                {...register('email')}
                errorMessage={errors.email?.message}
                label={'email'}
              />
            </div>
            <div className={sC.element}>
              <Textfield
                {...register('password')}
                label={'Password'}
                type={'password'}
                errorMessage={errors.password?.message}
              />
            </div>
            <div className={sC.element}>
              <Textfield
                {...register('confirm')}
                label={'Confirm password'}
                type={'password'}
                errorMessage={errors.confirm?.message}
              />
            </div>
          </div>
          <Button type="submit" className={sC.button}>
            Sign Up
          </Button>
          <Typography variant={'Body_2'} className={clsx(sC.center, sC.colorLight)}>
            Already have an account?
          </Typography>
          <Typography variant={'Link_1'} className={clsx(sC.center, sC.signUp)}>
            Sign Up
          </Typography>
        </Card>
      </div>
    </form>
  )
}