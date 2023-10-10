import { useEffect } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { omit } from 'remeda'
import { z } from 'zod'

import { Button } from '../../ui/Button/button.tsx'
import { Card } from '../../ui/Card'
import { Textfield } from '../../ui/Textfield'
import { Typography } from '../../ui/Typography'

import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { useSignUpMutation } from '@/services/auth/auth.service.ts'
import sC from '@/styles/formStyles.module.scss'

const schema = z
  .object({
    email: z.string(),
    password: z.string().min(2),
    confirm: z.string().min(2),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

type FormValues = z.input<typeof schema>

export const SignUpForm = () => {
  const [signUp, { error }] = useSignUpMutation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmitted = handleSubmit(data => signUp(omit(data, ['confirm'])))

  useEffect(() => {
    if (
      error &&
      'status' in error &&
      'data' in error &&
      error.status === 400 &&
      typeof error.data === 'object' &&
      error.data &&
      'errorMessages' in error.data &&
      Array.isArray(error.data.errorMessages)
    ) {
      error.data.errorMessages.forEach((errorMessage: any) => {
        setError(errorMessage.field, {
          type: 'custom',
          message: errorMessage.message as string,
        })
      })
    }
  }, [error])

  return (
    <form onSubmit={handleFormSubmitted}>
      <div className={sC.outerContainer}>
        <Card className={sC.card}>
          <DevTool control={control} />
          <Typography variant={'H1'} className={sC.center}>
            Sign Up
          </Typography>
          <div className={sC.values}>
            <div className={sC.element}>
              <ControlledTextField
                name={'email'}
                errorMessage={errors.email?.message}
                label={'email'}
                control={control}
              />
            </div>
            <div className={sC.element}>
              <ControlledTextField
                name={'password'}
                label={'Password'}
                type={'password'}
                errorMessage={errors.password?.message}
                control={control}
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
          <Button
            variant="link"
            className={clsx(sC.center, sC.signUp)}
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </Card>
      </div>
    </form>
  )
}
