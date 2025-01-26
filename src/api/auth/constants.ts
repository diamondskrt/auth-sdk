import { AuthCredentials, AuthResponseData } from './model'

const credentials: AuthCredentials = {
  username: 'username',
  password: 'password',
}

const responseData: AuthResponseData = {
  accessToken: 'abc123',
  accessTokenExpiresAt: '2025-01-26T12:00:00Z',
  refreshToken: 'def456',
  refreshTokenExpiresAt: '2025-01-26T12:00:00Z',
  abilityGroups: [],
  merchantCode: 'TEST',
  phone: '',
}

export { credentials, responseData }
