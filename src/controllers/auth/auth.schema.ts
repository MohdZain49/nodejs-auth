import { z } from "zod";

export const registrationSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  name: z.string().min(3),
});
