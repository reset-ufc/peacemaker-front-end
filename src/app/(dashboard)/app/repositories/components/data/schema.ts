import { z } from "zod";

export const repoSchema = z.object({
  _id: z.string(),
  id: z.number(),
  name: z.string(),
});

export type Repo = z.infer<typeof repoSchema>;
