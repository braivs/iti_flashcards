import { useState } from 'react'

import { Navigate } from 'react-router-dom'

import { Form, RecoverPassword } from '@/components/auth/recover-password/recover-password.tsx'
import { Loader } from '@/components/ui/Loader/Loader.tsx'
import { useRecoverPasswordMutation } from '@/services/auth/auth.service.ts'

export const RecoverPasswordPage = () => {
  const [recoverPassword, { isLoading: isMeLoading, isSuccess }] = useRecoverPasswordMutation()
  const [data, setData] = useState<Form>()
  const onDataSubmit = (data: Form) => {
    setData(data)
    recoverPassword(data)
  }

  if (isMeLoading) return <Loader />
  if (isSuccess) return <Navigate to="/check-email" state={data} />

  return (
    <div>
      <RecoverPassword onSubmit={onDataSubmit} />
    </div>
  )
}
