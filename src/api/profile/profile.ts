import { ClientApi } from '~/api'

import { Profile } from './model'

const profileUrl = '/v1/profile'

const profileApi = (client: ClientApi) => ({
  getProfile: () => client.get<Profile>({ endpoint: profileUrl }),
})

export { profileApi }
