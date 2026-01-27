import api from "./axios";
import type { TaskAssignment } from "../models/TaskAssignment";
import type { GenericApiResponse } from "./abstract/genericrapiesponse";
import type { CreateTaskAssignmentDto } from "../dto/CreateTaskAssignmentDto";


export const taskAssignmentService = {
    create:async(payload:Partial<CreateTaskAssignmentDto>) : Promise<void> => {
        const response = await api.post<GenericApiResponse<null>>("/task-assignments",payload);

         if (!response.data.success) {
            throw response.data.errors.join(", ");
         }
    }, 
    //altaki methodu kullanmıyorum herhalde bir test et sonra SİLİNECEK
    getMyTask :async (
        year:number,
        month:number
    ):Promise<TaskAssignment[]> =>{
        const response = await api.get<GenericApiResponse<TaskAssignment[]>>("/task-assigments/my",{params: {year,month}});

        return response.data.data ?? []
    },
    //(await api.get("/task-assigments/my",{params: {year,month}})).data,

    //eskisi
    /*
    complete:async(id:number) => 
        api.patch(`/task-assigments/${id}/complete`),
    */
   
    getMyTasks : async ():Promise<TaskAssignment[]> =>  {
        const response = await api.get<GenericApiResponse<TaskAssignment[]>>(
            "task-assignments/my"
        );
        if (!response.data.success) {
                  throw new Error(response.data.message || "gorevlerim getirilemedi");
                }

            return response.data.data ?? [];
    },

    complete:async(id:number):Promise<void> => {
        const response = await api.post<GenericApiResponse<null>>(`/task-assignments/${id}/complete`);

         if (!response.data.success) {
            throw response.data.errors;
         }
        //await api.post(`/task-assignments/${id}/complete`);
    },

    async getAll():Promise<TaskAssignment[]> {
        const response = await api.get<GenericApiResponse<TaskAssignment[]>>("task-assignments");

        return response.data.data ?? [];
    }
    /*
    async getAll():Promise<TaskAssignment[]> {
        const res = await api.get("task-assignments");
        return res.data;
    }
    */
    
};