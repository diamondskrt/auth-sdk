type ApiOptions = {
  baseUrl: string
  authKey: string
}

type Page = {
  currentPage: number
  from: number
  lastPage: number
  perPage: number
  to: number
  total: number
}

type Meta = {
  page: Page
}

type HeadersInit = Record<string, string>

export type { ApiOptions, Page, Meta, HeadersInit }
