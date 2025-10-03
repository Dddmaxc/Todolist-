import { instance } from "@/common/instance/instance"
import { TaskOperationResponse, TasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { BaseResponse } from "@/common/types/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<TasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTasks(todolistId: string, title: string) {
    return instance.post<TaskOperationResponse>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<TaskOperationResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  changeTaskTitle(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<TaskOperationResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
