import { z } from "zod";

import { AuthCredentialsSchema, AuthResponseDataSchema } from "./config";

type AuthCredentials = z.infer<typeof AuthCredentialsSchema>;

type AuthResponseData = z.infer<typeof AuthResponseDataSchema>;

export type { AuthCredentials, AuthResponseData };
