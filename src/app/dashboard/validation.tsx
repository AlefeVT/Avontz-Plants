import { z } from 'zod';

export const schema = z.object({
  name: z.string(),
  scientificName: z.string().optional().nullable(),
  description: z.string(),
  history: z.string().optional().nullable(),
  photos: z.string().optional().nullable(),
});
