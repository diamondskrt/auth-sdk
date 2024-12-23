import { z } from 'zod'

import { BaseEntity } from '~/api'

enum Role {
  Admin = 'admin',
  Merchant = 'merchant',
  Operator = 'operator',
  Worker = 'worker',
}

const AbilityGroupSchema = BaseEntity.merge(
  z.object({
    name: z.nativeEnum(Role),
    description: z.string(),
  })
)

export { AbilityGroupSchema, Role }
