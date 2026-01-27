export interface GenericApiResponse<T> {
    success:boolean;
    data:T | null; 
    message?:string;
    errors: string[];
}