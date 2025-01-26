import { z } from 'zod'

import { AbilityGroupSchema } from '~/api/ability-group'
import { BaseEntity } from '~/api/config'

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
    blockedAt: z.string().optional(),
    blockedTo: z.string().optional(),
  })
)

export { UserSchema }
