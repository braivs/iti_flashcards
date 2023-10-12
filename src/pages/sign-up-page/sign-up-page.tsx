import { SignUpForm } from '@/components/auth/signUp-form'
import s from '@/pages/sign-in-page/sign-in-page.module.scss'

export const SignUpPage = () => {
  return (
    <div className={s.component}>
      <SignUpForm />
    </div>
  )
}
