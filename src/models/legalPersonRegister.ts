import { EntityType } from "./enums/entityType";

export interface LegalPersonRegister {
    bussinessName: string;
    registerYear: number;
    entityType: EntityType;
    email: string;
    password: string;
    ruc: string;
}