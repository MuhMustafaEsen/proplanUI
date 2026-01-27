//import axios from "axios";
import type { GenericApiResponse } from "./abstract/genericrapiesponse";
import api from "./axios";

export interface CompanyProgressDto {
    companyId:number;
    companyName:string;
    completionRate:number;
}

export interface MonthlyCompletionDto {
    month:string;
    rate:number;
}

export interface UserPerformanceDto {
    userId:number;
    userName:string;
    total:number;
    completed:number;
    rate:number;
}

export const dashboardService = {
     getCompanyProgress:async () : Promise<CompanyProgressDto[]> => {
        const response = await api.get<GenericApiResponse<CompanyProgressDto[]>>("/Dashboard/company-progress");

            if (!response.data.success) {
                throw new Error(response.data.message || "Şirketler getirilemedi");
            }

        return response.data.data ?? [];
    },

    getMonthlyCompletion :async () : Promise<MonthlyCompletionDto[]> => {
        const response = await api.get<GenericApiResponse<MonthlyCompletionDto[]>>("/Dashboard/monthly-completion")
        
            if (!response.data.success) {
                throw new Error(response.data.message || "aylık işlemler getirilemedi");
            }

        return response.data.data ?? [];
    },

    getUserPerformance:async () : Promise<UserPerformanceDto[]> => {
        const response = await api.get<GenericApiResponse<UserPerformanceDto[]>>("/Dashboard/user-performance");
            
            if (!response.data.success) {
                throw new Error(response.data.message || "kullanıcı performans bilgisi getirilemedi");
            }

        return response.data.data ?? [];
    },
    //genericApiResponse öncesi
    /*
    getCompanyProgress:async () : Promise<CompanyProgressDto[]> => {
        const response = await api.get<CompanyProgressDto[]>("/Dashboard/company-progress");
        return response.data;
    },

    getMonthlyCompletion :async () : Promise<MonthlyCompletionDto[]> => {
        const response = await api.get<MonthlyCompletionDto[]>("/Dashboard/monthly-completion")
        return response.data;
    },

    getUserPerformance:async () : Promise<UserPerformanceDto[]> => {
        const response = await api.get<UserPerformanceDto[]>("/Dashboard/user-performance");
        return response.data;
    },
    */
};
