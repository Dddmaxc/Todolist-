import { z } from "zod"

export const TodolistSchema = z.object({
  id:  z.string(),
  title: z.string(),
  addedDate: z.coerce.date(),
  order: z.int(),
});

export type Todolist = z.infer<typeof TodolistSchema>


export const createResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    resultCode: z.number(),
    messages: z.array(z.string()),
    fieldsErrors: z.array(
      z.object({ field: z.string(), error: z.string() })
    ).optional(),
    data: dataSchema,
  })


