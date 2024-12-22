import { z } from "zod";

const UUIDSchema = z.string().uuid().optional();

const BaseEntity = z.object({
  id: UUIDSchema,
});

export { BaseEntity, UUIDSchema };
