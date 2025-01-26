import { describe, it, expect, vi, Mock } from 'vitest'

import { ClientApi } from '~/api/base'

import { authApi } from './auth'
import { credentials, responseData } from './constants'
import { isTokenExpired } from './lib'

vi.mock('./lib', () => ({
  isTokenExpired: vi.fn(),
}))

describe('authApi', () => {
  const mockClient = {
    post: vi.fn(),
    get: vi.fn(),
  }

  const api = authApi(mockClient as unknown as ClientApi)

  describe('signIn', () => {
    it('should call signIn method with correct URL and credentials', async () => {
      mockClient.post.mockImplementation(() => Promise.resolve(responseData))

      const result = await api.signIn(credentials)

      expect(mockClient.post).toHaveBeenCalledWith('/auth/token', credentials)
      expect(result).toEqual(responseData)
    })
  })

  describe('updateToken', () => {
    it('should return false if token is not expired', async () => {
      ;(isTokenExpired as Mock).mockReturnValue(false)

      const result = await api.updateToken(10)

      expect(result).toBe(false)
      expect(mockClient.get).not.toHaveBeenCalled()
    })

    it('should call updateToken method with correct URL if token is expired', async () => {
      ;(isTokenExpired as Mock).mockReturnValue(true)

      mockClient.get.mockImplementation(() => Promise.resolve(responseData))

      const result = await api.updateToken(10)

      expect(mockClient.get).toHaveBeenCalledWith({
        endpoint: '/auth/refresh-token',
      })

      expect(result).toEqual(responseData)
    })
  })
})
