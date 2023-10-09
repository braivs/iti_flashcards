import { useState } from 'react'

import { Navigate } from 'react-router-dom'

import { FormType, RecoverPassword } from '@/components/auth/recover-password/recover-password.tsx'
import { useRecoverPasswordMutation } from '@/services/auth/auth.service.ts'

export const RecoverPasswordPage = () => {
  const [recoverPassword, { isLoading: isMeLoading, isSuccess }] = useRecoverPasswordMutation()
  const [data, setData] = useState<FormType>()
  const onDataSubmit = (data: FormType) => {
    setData(data)
    recoverPassword(data)
  }

  if (isMeLoading) return <div>Loading...</div>
  if (isSuccess) return <Navigate to="/check-email" state={data} />

  return (
    <div>
      <RecoverPassword onSubmit={onDataSubmit} />
    </div>
  )
}
