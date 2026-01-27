/* 04.01.2026 çalışmasında kapatıldı çalısan bir yapısı var geri dönülecek yapı
export interface TaskAssignment{
    id:number;
    companyTaskId:number;

    //yeni eklendi alttaki 2
    companyName?:string;
    taskName?:string

    userId:number;
    
    //yeni eklendi altaki 1
    userName?:string;

    taskDate:string;
    isCompleted:boolean;
    completedAt?:string;
}
*/
export type TaskStatus = "Planned" | "Completed" | "Cancelled";

export interface TaskAssignment{
    id:number;
    companyId:number;
    companyName?:string;
    TaskId:number;
    taskName?:string
    userId:number;
    userName?:string;
    plannedDate:string;
    status:TaskStatus

    taskDate:string;
    isCompleted:boolean;
    completedAt?:string;
}