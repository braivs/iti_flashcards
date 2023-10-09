export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
}

export type LoginResponse = {
  accessToken: string
}

export type AuthMeResponse = {
  email: string
  name: string
  id: string
  isEmailVerified: boolean
  avatar?: string | null
  created: string
  updated: string
}

export type UpdateUserDataArgs = {
  avatar?: string
  name?: string
  email?: string
}
