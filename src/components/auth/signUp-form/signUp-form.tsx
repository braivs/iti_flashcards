import { useEffect } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { omit } from 'remeda'
import { z } from 'zod'

import { Button } from '../../ui/Button/button.tsx'
import { Card } from '../../ui/Card'
import { Typography } from '../../ui/Typography'

import sC from '@/common/commonStyles/formStyles.module.scss'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { useSignUpMutation } from '@/services/auth/auth.service.ts'

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

  // console.log(error)

  const signUpHandler = (data: FormValues) => {
    signUp(omit(data, ['confirm']))
      .unwrap()
      .catch(e => {
        const notify = () =>
          toast.error(e.data.errorMessages[0], { theme: 'colored', autoClose: 2000 })

        setError('email', { message: e.data.errorMessages[0] })
        notify()
      })
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmitted = handleSubmit(data => signUpHandler(data))

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
          <ToastContainer position={'top-center'} />
          <div className={sC.values}>
            <div className={sC.element}>
              <ControlledTextField
                name={'email'}
                errorMessage={errors.email?.message}
                label={'email'}
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
            <div className={sC.element}>
              <ControlledTextField
                name={'confirm'}
                label={'Confirm Password'}
                type={'password'}
                errorMessage={errors.confirm?.message}
                control={control}
                placeholder={'pass_Word12345'}
              />
            </div>
          </div>
          <Button type="submit" className={sC.button}>
            Sign Up
          </Button>
          <Typography variant={'Body_2'} className={clsx(sC.center, sC.colorLight)}>
            Already have an account?
          </Typography>
          <Button variant="link" className={clsx(sC.center, sC.signUp)} as={'a'} href={'/login'}>
            Sign In
          </Button>
        </Card>
      </div>
    </form>
  )
}
