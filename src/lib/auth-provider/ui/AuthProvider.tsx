import { useEffect, useState } from 'react'

import { authApi, Profile, profileApi, type AuthCredentials } from '~/api'
import { dayjs, storage } from '~/lib'

import { AuthProviderContext } from '../config'
import {
  AccessTokenParams,
  AuthProviderProps,
  RefreshTokenParams,
} from '../model'

export function AuthProvider({ children, client }: AuthProviderProps) {
  const { signIn, updateToken } = authApi(client)
  const { getProfile } = profileApi(client)
  const { setItem, getItem, removeItem } = storage

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(
      getItem({
        key: `${client.authKey}/accessToken`,
        useLocalStorage: client.useLocalStorage,
      })
    )
  )

  const [profile, setProfile] = useState<Profile | null>(null)
  const [isPending, setIsPending] = useState(false)

  const fetchProfile = async () => {
    try {
      setIsPending(true)
      const data = (await getProfile())?.data
      setProfile(data)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsPending(false)
    }
  }

  const setAccessToken = ({ accessToken, expires }: AccessTokenParams) => {
    const key = `${client.authKey}/accessToken`
    setItem({ key, value: accessToken, expires })
  }

  const removeAccessToken = () => {
    const key = `${client.authKey}/accessToken`
    removeItem({ key, useLocalStorage: client.useLocalStorage })
  }

  const setRefreshToken = ({ refreshToken, expires }: RefreshTokenParams) => {
    const key = `${client.authKey}/refreshToken`
    setItem({ key, value: refreshToken, expires })
  }

  const removeRefreshToken = () => {
    const key = `${client.authKey}/refreshToken`
    removeItem({ key, useLocalStorage: client.useLocalStorage })
  }

  const removeTokens = () => {
    removeAccessToken()
    removeRefreshToken()
  }

  const login = async (values: AuthCredentials) => {
    try {
      setIsPending(true)
      const data = (await signIn(values))?.data

      setAccessToken({
        accessToken: data.accessToken,
        expires: dayjs(data.accessTokenExpiresAt).toDate(),
      })

      setRefreshToken({
        refreshToken: data.refreshToken,
        expires: dayjs(data.refreshTokenExpiresAt).toDate(),
      })

      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsPending(false)
    }
  }

  const logout = () => {
    removeTokens()
    setIsAuthenticated(false)
  }

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthProviderContext.Provider
      value={{
        isAuthenticated,
        isPending,
        profile,
        login,
        logout,
        updateToken,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  )
}
