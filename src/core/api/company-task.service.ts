import api from "./axios";
import type { CompanyTask } from "../models/CompanyTask";
import type { GenericApiResponse } from "./abstract/genericrapiesponse";


export const companyTaskService = {
    
    getByCompanyAndMonth :async (
        companyId:number,
        year:number,
        month:number
    ):Promise<CompanyTask[]> => {
        const response = await api.get<GenericApiResponse<CompanyTask[]>>(`/company-tasks`,{params: {companyId,year,month}});

            if (!response.data.success) {
                throw new Error(response.data.message || "getByCompanyandMonth basarı ile gelmedi");
            }

        return response.data.data ?? [];
    },
    create:async(payload:Partial<CompanyTask>) => 
        (await api.post<GenericApiResponse<CompanyTask[]>>("/company-tasks",payload)).data.data,

     getAll: async () : Promise<CompanyTask[]> => {
        const response = await api.get<GenericApiResponse<CompanyTask[]>>("/company-tasks");

        if (!response.data.success) {
            throw new Error(response.data.message || "şirket görevleri getirilemedi")
        }
        
        return response.data.data ?? []
     }
    
    //genericApi öncesi
    /*
    getByCompanyAndMonth :async (
        companyId:number,
        year:number,
        month:number
    ):Promise<CompanyTask[]> =>
    (await api.get(`/company-tasks`,{params: {companyId,year,month}})).data,

    create:async(payload:Partial<CompanyTask>) => 
        api.post("/company-tasks",payload),

     getAll: async () : Promise<CompanyTask[]> => 
    (await api.get("/company-tasks")).data
    */
};