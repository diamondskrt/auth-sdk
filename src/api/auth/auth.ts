import { ClientApi } from '~/api/base'

import { isTokenExpired } from './lib'
import { AuthCredentials, AuthResponseData } from './model'

const authUrl = '/auth'

const authApi = (client: ClientApi) => ({
  signIn: (credentials: AuthCredentials) => {
    return client.post<AuthResponseData>(`${authUrl}/token`, credentials)
  },
  updateToken: (minValidity: number) => {
    if (!isTokenExpired(minValidity)) return Promise.resolve(false)
    return client.get<AuthResponseData>({
      endpoint: `${authUrl}/refresh-token`,
    })
  },
})

export { authApi }
