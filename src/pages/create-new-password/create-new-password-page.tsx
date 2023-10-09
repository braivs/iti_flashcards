import { Navigate, useParams } from 'react-router-dom'

import { CreateNewPassword } from '@/components/auth/create-new-password/create-new-password.tsx'
import { useCreateNewPasswordMutation } from '@/services/auth/auth.service.ts'

export const CreateNewPasswordPage = () => {
  const [createPassword, { isSuccess }] = useCreateNewPasswordMutation()

  if (isSuccess) return <Navigate to="/login" />

  return <CreateNewPassword onSubmit={createPassword} />
}
