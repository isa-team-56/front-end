export interface Appointment {
    id?: number;
    start: Date;
    duration: number;
    companyId:number;
    adminName:string;
    adminSurname:string;
    isReserved:boolean;
    adminId:number;
    
}