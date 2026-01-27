
import api from "./axios";
import type { GenericApiResponse } from "./abstract/genericrapiesponse";
import type { TaskSubItem } from "../models/TaskSubItem";

export const taskSubItemService = {

  getBySubTaskItemById: async (
    taskAssignmentId: number
  ): Promise<TaskSubItem[]> => {
    const response = await api.get<
      GenericApiResponse<TaskSubItem[]>
    >(`/task-subitems/${taskAssignmentId}`);//(`/task-sub-items/by-assignment/${taskAssignmentId}`);

    if (!response.data.success) {
      throw new Error(response.data.message || "Alt görevler getirilemedi");
    }

    return response.data.data ?? [];
  },

  getByTaskSubItemsByAssignmentId: async (
    taskAssignmentId: number): Promise<TaskSubItem[]> => {
    const response = await api.get<GenericApiResponse<TaskSubItem[]>>
    (`/task-subitems/assignment/${taskAssignmentId}`);

    if (!response.data.success) {
      throw new Error(response.data.message || "Alt görevler getirilemedi");
    }

    return response.data.data ?? [];
  },

  create: async (payload: Partial<TaskSubItem>): Promise<void> => {
    const response = await api.post<GenericApiResponse<null>>("/task-subitems", payload);

    if (!response.data.success) {
      throw response.data.errors || response.data.message;
    }
  },

  update: async (
    id: number,
    payload: Partial<TaskSubItem>
  ): Promise<void> => {
    const response = await api.put<
      GenericApiResponse<TaskSubItem>
    >(`/task-sub-items/${id}`, payload);

    if (!response.data.success) {
      throw response.data.errors || response.data.message;
    }
  },

  toggle:async (id:number,isCompleted:boolean) => {
    await api.put<GenericApiResponse<null>>(`/task-subitems/${id}/complete`,{
      id,
      isCompleted
    });
  },

  remove: async(id:number) => {
    await api.delete(`buraya delete api gelecek${id}`);  
  }
};

/*
import api from "axios";

export const taskSubItemService = {
    getByAssignment : (taskAssignmentId:number) =>
        api.get(`/task-sub-items/by-assignment/${taskAssignmentId}`).then(r => r.data),

    create: (data:any) =>
        api.post("task-sub-items",data),

    update:(id:number,data:any) =>
        api.put(`task-sub-items/${id},data`)
};
*/