import { z } from "zod";

import { UserSchema } from "./config";

type User = z.infer<typeof UserSchema>;

export type { User };
