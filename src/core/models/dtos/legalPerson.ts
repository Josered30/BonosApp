import { Entity } from "../enums/entity";

export interface LegalPerson {
  id: number;
  bussinessName: string;
  registerYear: number;
  entityType: Entity;
  email: string;
  password: string;
  ruc: string;
}
