import Cookies from 'js-cookie'
import { ofetch } from 'ofetch'

import { ApiOptions, HeadersInit, Meta } from './model'

class ClientApi {
  private baseUrl: string | null = null
  authKey: string | null = null
  useLocalStorage: boolean = false
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  constructor({ baseUrl, authKey, useLocalStorage }: ApiOptions) {
    this.baseUrl = baseUrl
    this.authKey = authKey
    this.useLocalStorage = useLocalStorage ?? false
  }

  private getAuthHeaders(): HeadersInit {
    const token = Cookies.get(`${this.authKey}/accessToken`)
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  private async request<T>(
    endpoint: string,
    options: Omit<RequestInit, 'headers'> & { headers?: HeadersInit } = {}
  ): Promise<{ data: T; meta: Meta }> {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      ...options,
      headers: {
        ...this.headers,
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    }

    try {
      const res = await ofetch<{ data: T; meta: Meta }>(url, config)
      return {
        data: res?.data,
        meta: res?.meta,
      }
    } catch (error) {
      const errorMessage = (error as Error)?.message ?? 'Unknown error'
      throw new Error(errorMessage)
    }
  }

  public get<T>({
    endpoint,
    params,
  }: {
    endpoint: string
    params?: Record<string, string>
    deserialize?: boolean
  }): Promise<{ data: T; meta: Meta }> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : ''
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' })
  }

  public post<T>(
    endpoint: string,
    body: unknown
  ): Promise<{ data: T; meta: Meta }> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
      },
    })
  }

  public patch<T>(
    endpoint: string,
    body: unknown
  ): Promise<{ data: T; meta: Meta }> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
      },
    })
  }

  public delete<T>(endpoint: string): Promise<{ data: T; meta: Meta }> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: {
        Accept: 'application/vnd.api+json',
      },
    })
  }
}

const createAuthClient = (options: ApiOptions) => new ClientApi(options)

export { ClientApi, createAuthClient }
