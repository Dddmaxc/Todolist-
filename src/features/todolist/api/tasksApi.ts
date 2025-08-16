import { instance } from "@/common/instance/instance"
import { DomainTask, TasksResponse, UpdateTaskModel } from "./tasksApi.types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<TasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTasks(todolistId: string, title: string) {
    return instance.post<{ data: { item: DomainTask } }>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<{ data: { item: DomainTask } }>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  changeTaskTitle(todolistId: string, taskId: string, model: UpdateTaskModel) {
    return instance.put<{ item: DomainTask }>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<any>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
