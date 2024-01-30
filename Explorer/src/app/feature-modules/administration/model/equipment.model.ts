export interface Equipment {
    id?: number;
    name: string;
    description: string;
    type:Type;
    price:number;
    companyIds:number[];
}

export enum Type{
    machine = 0,
    sensor,
    monitor,
    table
    
}