export interface BondSummary {
    id: number;
    name: string;
    issuer: string;
    nominalValue: number;
    tir: number;
    modifiedDuration: number;
    emmitionDate: string;
    saleDate?: string;
    lastPaymentDate?: string;
    nextPaymentDate?: string;
}