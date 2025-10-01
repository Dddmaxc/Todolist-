import { TaskPriority, TaskStatus } from "@/common/enums/enums"
import { z } from "zod"

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  deadline: z.string().nullable(),
  startDate: z.string().nullable(),
  title: z.string(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.coerce.date(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
})

export type DomainTask = z.infer<typeof domainTaskSchema>

export type TasksResponse = {
  error: Nullable
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: Nullable
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: Nullable
  deadline: Nullable
}

export type Nullable<T = string> = T | null 

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
