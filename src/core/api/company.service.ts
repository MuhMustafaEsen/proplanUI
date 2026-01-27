import api from "./axios";
import type { Company } from "../models/Company";
import type { GenericApiResponse } from "./abstract/genericrapiesponse"; //sonradan boyle olcak


export const companyService = {
    /*
    getAll: async () : Promise<Company[]> => 
        (await api.get("/companies")).data,
    */
    /*
    getAll: async () : Promise<Company[]> => 
        (await api.get<GenericApiResponse<Company[]>>("/companies")).data.data,       
    */
    getAll: async (): Promise<Company[]> => {
            const response = await api.get<GenericApiResponse<Company[]>>("/companies");

                if (!response.data.success) {
                  throw new Error(response.data.message || "Şirketler getirilemedi");
                }

            return response.data.data ?? [];
    },

    getById: async (id:number): Promise<Company> => {
           const response = await api.get<GenericApiResponse<Company>>(`/companies/${id}`);

           if (!response.data.success || !response.data.data) {
           throw new Error(response.data.message || "Şirket bulunamadı");
           }

           return response.data.data;
    },

    create:async(payload:Partial<Company>) : Promise<void> => {
        const response = await api.post<GenericApiResponse<null>>("/companies",payload);

         if (!response.data.success) {
         throw response.data.errors;
         }
    }, 
     update:async (id:number,payload:Partial<Company>) : Promise<void> => {
        const response = await api.put<GenericApiResponse<Company>>(`/companies/${id}`,payload);
        
         if (!response.data.success) {
         throw response.data.errors;
         }
    },

    toggleActive:async (id:number) : Promise<void> => {
        const response = await api.patch<GenericApiResponse<null>>(`/companies/${id}/toggle`);

        if (!response.data.success) {
        throw new Error(response.data.message);
        }
    }
    //GenericApi öncesi service mimarisi
    /*
    getById: async (id:number): Promise<Company> => 
        (await api.get(`/companies/${id}`)).data,

    create:async(payload:Partial<Company>) => 
        api.post("/companies",payload),
    
    update:async (id:number,payload:Partial<Company>) => 
        api.put(`/companies/${id}`,payload),
    
    toggleActive:async (id:number) =>
        api.patch(`/companies/${id}/toggle`)
    */
};