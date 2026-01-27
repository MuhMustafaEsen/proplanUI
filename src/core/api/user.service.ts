import api from "./axios";
import type { User } from "../models/User";
import type { GenericApiResponse } from "./abstract/genericrapiesponse";


export const userService = {
    getAll: async () : Promise<User[]> => {
        const response = await api.get<GenericApiResponse<User[]>>("/Users");

                if (!response.data.success) {
                  throw new Error(response.data.message || "kullanıcılar getirilemedi");
                }

        return response.data.data ?? []
    },
    //(await api.get("/Users")).data,       
    
    create:async(payload:Partial<User>) => {
        const response = await api.post<GenericApiResponse<User[]>>("/Users",payload);

        return response.data.message;
    }
    //api.post("/Users",payload),
};