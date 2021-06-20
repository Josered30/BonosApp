import { Entity } from "./enums/entity";

export interface LegalPersonRegister {
    bussinessName: string;
    registerYear: number;
    entityType: Entity;
    email: string;
    password: string;
    ruc: string;
}