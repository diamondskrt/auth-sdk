import { Role } from '~/api/ability-group/'

import { Profile } from './model'

const profileData: Profile = {
  id: '123',
  email: 'mail@mail.com',
  fullName: 'Test User',
  username: 'testuser',
  phone: null,
  merchantCode: 'TEST',
  isAdmin: true,
  abilityGroups: [Role.Admin],
}

export { profileData }
