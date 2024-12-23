import { Role, User } from '~/api'

interface Profile extends Omit<User, 'abilityGroups'> {
  abilityGroups: Role[]
}

export type { Profile }
