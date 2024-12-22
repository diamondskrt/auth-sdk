import { Api } from "~/api";

import { Profile } from "./model";

const profileUrl = "/v1/profile";

class ProfileApi extends Api {
  getProfile() {
    return this.get<Profile>({ endpoint: profileUrl });
  }
}

const profileApi = new ProfileApi();

export { profileApi };
