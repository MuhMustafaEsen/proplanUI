export interface User {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    role:string;
    createdAt:string;

    //sonradan eklendi
    passwordH:string;
}