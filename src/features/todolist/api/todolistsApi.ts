import { instance } from '@/common/instance/instance';
import { Todolist } from './todolistsApi.types';
import { BaseResponse } from '@/common/types/types';
import { DomainTodolist } from '../model/todolists-slice';


export const todolistsApi = {
  getTodolists() {
    return instance.get<DomainTodolist[]>('/todo-lists');
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
