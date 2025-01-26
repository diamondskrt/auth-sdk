import { storage } from '~/lib/storage'

const isTokenExpired = (minValidity: number) => {
  const token = storage.getItem({ key: 'accessToken' })
  if (!token) return true
  return token.expires.getTime() < Date.now() + minValidity * 60 * 1000
}

export { isTokenExpired }
