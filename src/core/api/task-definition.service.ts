import api from "./axios";
import type { TaskDefinition } from "../models/TaskDefinition";
import type { GenericApiResponse } from "./abstract/genericrapiesponse";


export const taskDefinitionService = {
    getAll: async () : Promise<TaskDefinition[]> => {
        const response = await api.get<GenericApiResponse<TaskDefinition[]>>("/task-definitions");
        
        return response.data.data ?? [];
    },
          
    
    create:async(payload:Partial<TaskDefinition>) =>  {
        const response = await api.post<GenericApiResponse<TaskDefinition[]>>("/task-definitions",payload);

        return response.data.message ?? [];

    },
        //api.post("/task-definitions",payload),
    
    update:async (id:number,payload:Partial<TaskDefinition>) => {
        const response = await api.put<GenericApiResponse<TaskDefinition[]>>(`/task-definitions/${id}`,payload);

        return response.data.message;
    }

        //api.put(`/task-definitions/${id}`,payload),
    
   

};