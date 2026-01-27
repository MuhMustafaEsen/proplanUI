import api from "./axios";

export const authService = {
    login:async(email:string,password:string) => {
        const {data} = await api.post("/auth/login",{email,password});      
        localStorage.setItem("refreshToken",data.refreshToken);

        return data;
    },

    refresh:async () => {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) throw new Error("No refresh token");
        
        const {data} = await api.post("/auth/refresh",{refreshToken});

        localStorage.setItem("accessToken",data.accessToken);
        localStorage.setItem("refreshToken",data.refreshToken);

        return data;
    },
    logout: async() => {
        const refreshToken = localStorage.getItem("refreshToken");

        if(refreshToken){
            await api.post("/auth/logout",{refreshToken});
        }
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
}