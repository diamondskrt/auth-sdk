import Cookies from 'js-cookie'

import { dayjs } from '~/lib/dayjs'

import { StorageOptions, StorageBaseOptions } from './model'

const storage = {
  setItem: ({ key, value, expires, useLocalStorage }: StorageOptions) => {
    if (useLocalStorage) {
      localStorage.setItem(key, JSON.stringify({ value, expires }))
    } else {
      Cookies.set(key, value, { expires })
    }
  },

  getItem: ({ key, useLocalStorage }: StorageBaseOptions) => {
    if (useLocalStorage) {
      const item = localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key) as string)
        : null
      if (item && dayjs(item.expires).isAfter(dayjs())) {
        return item.value
      } else {
        localStorage.removeItem(key)
        return null
      }
    } else {
      return Cookies.get(key)
    }
  },

  removeItem: ({ key, useLocalStorage }: StorageBaseOptions) => {
    if (useLocalStorage) {
      localStorage.removeItem(key)
    } else {
      Cookies.remove(key)
    }
  },
}

export { storage }
