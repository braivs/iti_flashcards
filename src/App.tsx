import { Provider } from 'react-redux'

import s from './App.module.scss'

import { Router } from '@/router.tsx'
import { store } from '@/services/store.ts'

export function App() {
  return (
    <div className={s.app}>
      <Provider store={store}>
        <div className={s.container}>
          <Router />
        </div>
      </Provider>
    </div>
  )
}
