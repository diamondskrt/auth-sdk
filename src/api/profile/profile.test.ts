import { describe, it, expect, vi } from 'vitest'

import { ClientApi } from '~/api/base'

import { profileData } from './constants'
import { profileApi } from './profile'

describe('profileApi', () => {
  it('should call getProfile method with the correct endpoint', async () => {
    const mockGet = vi.fn().mockResolvedValue({ data: profileData })
    const mockClient: ClientApi = { get: mockGet } as unknown as ClientApi

    const api = profileApi(mockClient)
    await api.getProfile()

    expect(mockGet).toHaveBeenCalledWith({ endpoint: '/v1/profile' })
  })
})
