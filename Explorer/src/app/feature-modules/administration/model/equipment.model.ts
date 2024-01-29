export interface Equipment {
    id?: number;
    name: string;
    description: string;
    type:Type;
    price:number;
    companyId:number;
}

export enum Type{
    machine = 0,
    sensor,
    monitor,
    table
    
}