import { ClientApi } from '~/api'

import { AuthCredentials, AuthResponseData } from './model'

const authUrl = '/auth'

const authApi = (client: ClientApi) => ({
  signIn: (credentials: AuthCredentials) => {
    return client.post<AuthResponseData>(`${authUrl}/token`, credentials)
  },
})

export { authApi }
