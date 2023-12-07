import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './sign-in-page.module.scss'
import 'react-toastify/dist/ReactToastify.css'

import { SignIn } from '@/components/auth/signIn-form'
import { useGetMeQuery, useLoginMutation } from '@/services/auth/auth.service.ts'
import { LoginArgs } from '@/services/auth/auth.types.ts'

export const SignInPage = () => {
  const [login, { error }] = useLoginMutation()
  const { data: me, isLoading: isMeLoading } = useGetMeQuery()

  console.log(error)
  const handleLogin = (args: LoginArgs) => {
    login(args)
      .unwrap()
      .catch(e => {
        const notify = () => toast.error(e.data.message, { theme: 'colored', autoClose: 2000 })

        notify()
      })
  }

  if (isMeLoading) return <div>Loading...</div>
  if (me && me?.success !== false) return <Navigate to="/" />

  return (
    <div className={s.component}>
      <SignIn onSubmit={handleLogin} />
    </div>
  )
}
