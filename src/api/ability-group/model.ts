import { z } from 'zod'

import { AbilityGroupSchema } from './config'

type AbilityGroup = z.infer<typeof AbilityGroupSchema>

export type { AbilityGroup }
