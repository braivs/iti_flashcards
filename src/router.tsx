import {createBrowserRouter, Navigate, Outlet, RouteObject, RouterProvider} from 'react-router-dom'
import {DecksPage} from "@/pages/decks-page/decks-page.tsx"
import {SignInPage} from "@/pages/sign-in-page/sign-in-page.tsx"
import {SignUpPage} from "@/pages/sign-up.tsx"
import {useGetMeQuery} from "@/services/auth/auth.service.ts"

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  }
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <DecksPage />,
  },
]

const router = createBrowserRouter([
  {
    element: <PrivateRoutes />,
    children: privateRoutes,
  },
  ...publicRoutes
])

export const Router = () => {
  const {isLoading: isMeLoading} = useGetMeQuery()

  if (isMeLoading) return <div>Loading...</div>

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const {data: me, isLoading: isMeLoading} = useGetMeQuery()

  const isAuthenticated = me && me?.success !== false

  if (isMeLoading) return <div>Loading...</div>

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}