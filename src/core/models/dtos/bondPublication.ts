import { BondState } from "../enums/bondState";
import { Bond } from "./bond";

export interface BondPublication {
    id: number;
    bond: Bond;
    expectedRate: number;
    description: string;
    issuerProfileId: number;
    holderProfileId?: number;
    state: BondState;
    lastPaymentDate?: Date;
    nextPaymentDate?: Date;
    name: string;
    saleDate: Date;
}
