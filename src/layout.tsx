import { Outlet } from 'react-router-dom'

import { Header } from '@/components/ui/Header/header.tsx'

export const Layout = () => {
  return (
    <>
      <Outlet />
      <Header />
    </>
  )
}
