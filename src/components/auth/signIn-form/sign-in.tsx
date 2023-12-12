import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import { z } from 'zod'

import { Card } from '../../ui/Card'
import { Typography } from '../../ui/Typography'

import sC from '@/common/commonStyles/formStyles.module.scss'
import { Button } from '@/components/ui/Button'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().optional(),
})

type FormValues = z.input<typeof schema>

export const SignIn = (props: PropsType) => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  useEffect(() => {
    if (props.error !== undefined) {
      setError('email', { message: props.error, type: 'custom' })
      setError('password', { message: props.error, type: 'custom' })
    }
  }, [props.error])

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <form onSubmit={handleFormSubmitted}>
      <div className={sC.outerContainer}>
        <ToastContainer position={'top-center'} />
        <Card className={sC.card}>
          <Typography variant={'H1'} className={sC.center}>
            Sign In
          </Typography>
          <div className={sC.values}>
            <div className={sC.element}>
              <ControlledTextField
                name={'email'}
                errorMessage={errors.email?.message}
                label={'Email'}
                control={control}
                placeholder={'example@proton.me'}
              />
            </div>
            <div className={sC.element}>
              <ControlledTextField
                name={'password'}
                label={'Password'}
                type={'password'}
                errorMessage={errors.password?.message}
                control={control}
                placeholder={'pass_Word12345'}
              />
            </div>
          </div>
          <ControlledCheckbox
            name={'rememberMe'}
            control={control}
            label={'Remember me'}
            className={sC.checkbox}
            position={'left'}
          />
          <Button variant="link" as={'a'} href={'/recover-password'} className={sC.right}>
            Forgot Password?
          </Button>
          <Button type="submit" className={sC.button}>
            Sign in
          </Button>
          <Typography variant={'Body_2'} className={clsx(sC.center, sC.colorLight)}>
            Don&apos;t have an account?
          </Typography>
          <Button
            type="button"
            variant="link"
            className={clsx(sC.center, sC.signUp)}
            as={'a'}
            href={'/sign-up'}
          >
            Sign Up
          </Button>
        </Card>
      </div>
    </form>
  )
}

type FormType = z.infer<typeof schema>

type PropsType = {
  onSubmit: (data: FormType) => void
  error?: string | undefined
}
