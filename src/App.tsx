import s from './App.module.scss'

import { Router } from '@/router.tsx'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'

export function App() {
  const { isLoading: isMeLoading } = useGetMeQuery()

  if (isMeLoading) return <div>Loading...</div>

  return (
    <div className={s.app}>
      <div className={s.container}>
        <Router />
      </div>
    </div>
  )
}
