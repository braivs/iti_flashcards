import { Provider } from 'react-redux'

import s from './App.module.scss'

import { Header } from '@/components/ui/Header/header.tsx'
import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <div className={s.app}>
      <Provider store={store}>
        <Header />
        <div className={s.container}>
          <Router />
        </div>
      </Provider>
    </div>
  )
}
