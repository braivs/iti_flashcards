import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './create-new-password.module.scss'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Textfield } from '@/components/ui/Textfield'
import { Typography } from '@/components/ui/Typography'

const schema = z.object({
  password: z.string().min(6),
})

type FormType = z.infer<typeof schema>

export const CreateNewPassword = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  })
  const onSubmit = (data: FormType) => {
    console.log(data)
  }
  /*const handleFormSubmitted = handleSubmit(props.onSubmit)
      type Props = {
        onSubmit: (data: FormType) => void
      }*/

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography variant="Large" className={s.title}>
          Create new password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.input}>
            <Textfield
              {...register('password')}
              label={'Password'}
              type={'password'}
              errorMessage={errors.password?.message}
            />
          </div>
          <Typography variant="Caption" className={s.instructions}>
            Create new password and we will send you further instructions to email
          </Typography>
          <Button fullWidth type={'submit'}>
            Create new password
          </Button>
        </form>
      </Card>
    </>
  )
}
