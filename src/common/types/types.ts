import { ResultCode } from "../enums/enums"
import { z } from "zod"

export const fieldErrorSchema = z.object({
  error: z.string(),
  field: z.string(),
})

type FieldError = z.infer<typeof fieldErrorSchema>

export type BaseResponse<T = {}> = {
  data: T
  resultCode: ResultCode
  messages: string[]
  fieldsErrors: FieldError[]
}

export const baseResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    resultCode: z.nativeEnum(ResultCode),
    messages: z.string().array(),
    fieldsErrors: fieldErrorSchema.array(),
  })
