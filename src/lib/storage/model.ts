type StorageBaseOptions = {
  key: string
  useLocalStorage?: boolean
}

type StorageOptions = StorageBaseOptions & {
  value: string
  expires: Date
}

export type { StorageOptions, StorageBaseOptions }
