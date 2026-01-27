import axios, {AxiosError} from "axios";
import {authService} from "../api/auth.service";
import { notifyError } from "../ErrorHandle/ErrorHandler";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://192.168.1.14:5000/api"

const api = axios.create({
    /*baseURL: "https://localhost:5001/api",*/ /* burası localhost olarak çalıştırdıgımda açılacak. */
    baseURL:API_BASE_URL,
    headers: {
        "Content-Type":"application/json"
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

const extractMessage = (error: AxiosError): string => {
  const apiMessage =
        (error.response?.data as any)?.message ||
        (error.response?.data as any)?.title;
        if (apiMessage) return apiMessage;
        if (error.response?.statusText) return error.response.statusText;
    return error.message || "Beklenmeyen bir hata oluştu.";
};

api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const originalRequest = error.config as any;
    //const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            await authService.refresh();           
            return api(originalRequest);
        } catch {
            authService.logout();
            window.location.replace("/login");
            return Promise.reject(error);
        }
        
    }
    const message = extractMessage(error);
    const status = error.response?.status;
    const severity = status && status >= 500 ? "error" : "warning";
    
    notifyError(message, severity);

    return Promise.reject(error);
}
);

export default api;

