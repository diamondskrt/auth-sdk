import { z } from 'zod'

import { AbilityGroupSchema } from '~/api'

const AuthCredentialsSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(5),
})

const AuthResponseDataSchema = z.object({
  abilityGroups: z.array(AbilityGroupSchema),
  merchantCode: z.string().min(1),
  phone: z.string(),
  accessToken: z.string().min(1),
  accessTokenExpiresAt: z.string().min(1),
  refreshToken: z.string().min(1),
  refreshTokenExpiresAt: z.string().min(1),
})

export { AuthCredentialsSchema, AuthResponseDataSchema }
