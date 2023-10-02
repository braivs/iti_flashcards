import { Navigate } from 'react-router-dom'

import s from './sign-in-page.module.scss'

import { SignIn } from '@/components/auth/signIn-form'
import { useGetMeQuery, useLoginMutation } from '@/services/auth/auth.service.ts'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <div>Loading...</div>
  if (me && me?.success !== false) return <Navigate to="/" />

  return (
    <div className={s.component}>
      <SignIn onSubmit={login} />
    </div>
  )
}
