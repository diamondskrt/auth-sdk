import { Role } from '~/api/ability-group'
import { User } from '~/api/user'

interface Profile extends Omit<User, 'abilityGroups'> {
  abilityGroups: Role[]
}

export type { Profile }
