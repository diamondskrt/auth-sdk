import { Api } from "~/api";

import { AuthCredentials, AuthResponseData } from "./model";

const authUrl = "/auth";

class AuthApi extends Api {
  login(credentials: AuthCredentials) {
    return this.post<AuthResponseData>(`${authUrl}/token`, credentials);
  }
}

const authApi = new AuthApi();

export { authApi };
