import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './create-new-password.module.scss'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field'
import { Typography } from '@/components/ui/Typography'
import { CreatPass } from '@/services/auth/auth.types.ts'

const schema = z.object({
  password: z.string().min(6),
})

export type FormeType = z.infer<typeof schema>
type Props = {
  onSubmit: (data: CreatPass) => void
}
export const CreateNewPassword = (props: Props) => {
  const { control, handleSubmit } = useForm<FormeType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  })
  const { token } = useParams()
  const handleFormSubmitted = handleSubmit(data =>
    props.onSubmit({ ...data, token: token || 'not found' })
  )

  return (
    <>
      <DevTool control={control} />
      <Card className={s.card}>
        <Typography variant="Large" className={s.title}>
          Create new password
        </Typography>
        <form onSubmit={handleFormSubmitted}>
          <div className={s.input}>
            <ControlledTextField
              placeholder={'Password'}
              name={'password'}
              control={control}
              type={'password'}
              label={'Password'}
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
