import {Provider} from "react-redux"
import {store} from "@/services/store.ts"
import {Router} from "@/router.tsx"
import {Header} from "@/components/ui/Header/header.tsx"
import s from "./App.module.scss"

export function App() {

  return (
    <div className={s.app}>
      <Provider store={store}>
        <Header/>
        <div className={s.container}>
          <Router/>
        </div>
      </Provider>
    </div>
  )
}
