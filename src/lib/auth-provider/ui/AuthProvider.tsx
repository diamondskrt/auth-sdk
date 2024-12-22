import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import { authApi, Profile, profileApi, type AuthCredentials } from "~/api";
import { dayjs } from "~/lib";

import { AuthProviderContext } from "../config";
import {
  AccessTokenParams,
  AuthProviderProps,
  RefreshTokenParams,
} from "../model";

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get("auth-app/accessToken")),
  );

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isPending, setIsPending] = useState(false);

  const fetchProfile = async () => {
    try {
      setIsPending(true);
      const data = (await profileApi.getProfile())?.data;
      setProfile(data);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const setAccessToken = ({ accessToken, expires }: AccessTokenParams) => {
    Cookies.set("auth-app/accessToken", accessToken, { expires });
  };

  const removeAccessToken = () => {
    Cookies.remove("auth-app/accessToken");
  };

  const setRefreshToken = ({ refreshToken, expires }: RefreshTokenParams) => {
    Cookies.set("auth-app/refreshToken", refreshToken, { expires });
  };

  const removeRefreshToken = () => {
    Cookies.remove("auth-app/refreshToken");
  };

  const removeTokens = () => {
    removeAccessToken();
    removeRefreshToken();
  };

  const login = async (values: AuthCredentials) => {
    try {
      setIsPending(true);
      const data = (await authApi.login(values))?.data;

      setAccessToken({
        accessToken: data.accessToken,
        expires: dayjs(data.accessTokenExpiresAt).toDate(),
      });

      setRefreshToken({
        refreshToken: data.refreshToken,
        expires: dayjs(data.refreshTokenExpiresAt).toDate(),
      });

      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const logout = () => {
    removeTokens();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthProviderContext.Provider
      value={{
        isAuthenticated,
        isPending,
        profile,
        login,
        logout,
      }}
    >
      {children}
    </AuthProviderContext.Provider>
  );
}
