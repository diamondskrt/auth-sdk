import { createContext } from 'react'

import { AuthProviderContextType } from '../model'

const AuthProviderContext = createContext<AuthProviderContextType | undefined>(
  undefined
)

export { AuthProviderContext }
