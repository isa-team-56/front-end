export interface Reservation {
    id?: number;
    reservedAppointment: number;
    userId: number;
    state:string;
    equipmentId: number;
    companyId:number;
}