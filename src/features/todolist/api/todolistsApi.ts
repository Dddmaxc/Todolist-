import { instance } from '@/common/instance/instance';
import { Todolist } from './todolistsApi.types';
import { BaseResponse } from '@/common/types/types';


export const todolistApi = {
  getTodolists() {
    return instance.get<Todolist[]>('/todo-lists');
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>('/todo-lists', {
      title,
    });
  },
  changeTodolistTitle(id: string, title: string) {
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title });
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`);
  },
};
