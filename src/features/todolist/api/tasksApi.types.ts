import { TaskPriority, TaskStatus } from "@/common/enums/enums"

export type DomainTask = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type TasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"