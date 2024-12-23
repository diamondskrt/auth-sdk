import { z } from 'zod'

import { AbilityGroupSchema, BaseEntity } from '~/api'

const UserSchema = BaseEntity.merge(
  z.object({
    fullName: z.string().min(1),
    username: z.string().min(1),
    email: z.string().optional(),
    phone: z.string().nullable().optional(),
    password: z.string().optional(),
    isAdmin: z.boolean().optional(),
    abilityGroups: z.array(AbilityGroupSchema),
    merchantCode: z.string().min(1),
    blockedAt: z.string(),
    blockedTo: z.string().optional(),
  })
)

export { UserSchema }
