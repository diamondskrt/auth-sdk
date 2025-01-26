import { AuthCredentials } from '~/api/auth'
import { ClientApi } from '~/api/base'
import { Profile } from '~/api/profile'

type AccessTokenParams = {
  accessToken: string
  expires: Date
}

type RefreshTokenParams = {
  refreshToken: string
  expires: Date
}

interface AuthProviderContextType {
  isAuthenticated: boolean
  isPending: boolean
  login: (values: AuthCredentials) => void
  logout: () => void
  updateToken: (minValidity: number) => void
  profile: Profile | null
}

type AuthProviderProps = {
  children: React.ReactNode
  client: ClientApi
}

export type {
  AccessTokenParams,
  RefreshTokenParams,
  AuthProviderContextType,
  AuthProviderProps,
}
