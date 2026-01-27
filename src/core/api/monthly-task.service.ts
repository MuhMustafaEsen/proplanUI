import api from "./axios";
import type { TaskAssignment } from "../models/TaskAssignment";
import type { MonthlyTaskFilter } from "../models/Monthly-Task-Filter";
import type { GenericApiResponse } from "./abstract/genericrapiesponse";

export const monthlyTaskService = {

    getMonthlyTasks: async (filter:MonthlyTaskFilter) : Promise <TaskAssignment[]> =>{
        const response = await api.post<GenericApiResponse<TaskAssignment[]>>("/task-assignments/monthly",filter);
    
        return response.data.data ?? [];
    },
       

    completeTask: async (id:number) : Promise<void> => {
            const response = await api.put<GenericApiResponse<TaskAssignment>>(`/task-assignments/${id}/complete`);

            if (!response.data.success) {
                throw response.data.errors;
            }
    }
        

    //GenericApiResponse öncesi kod blogu
    /*
    getMonthlyTasks:(filter:MonthlyTaskFilter) =>
        api.post<TaskAssignment[]>("/task-assignments/monthly",filter),

    completeTask:(id:number) => 
        api.put(`/task-assignments/${id}/complete`)
    */
}