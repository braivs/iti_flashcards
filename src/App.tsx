import s from './App.module.scss'

import { Loader } from '@/components/ui/Loader/Loader.tsx'
import { Router } from '@/router.tsx'
import { useGetMeQuery } from '@/services/auth/auth.service.ts'

export function App() {
  const { isLoading: isMeLoading } = useGetMeQuery()

  // if (isMeLoading) return <Loader />

  return (
    <div className={s.app}>
      <div className={s.container}>{isMeLoading ? <Loader /> : <Router />}</div>
    </div>
  )
}
