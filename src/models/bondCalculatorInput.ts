import { EnumType } from "./enumType";

export interface BondCalculatorInput {
  nominalValue?: number;
  commercialValue?: number;
  year?: number;
  couponFrequency?: EnumType;
  daysPerYear?: number;
  interestRateType?: EnumType;
  capitalization?: EnumType;
  interestRate?: number;
  annualDiscountRate?: number;
  incomeTax?: number;
  emmitionDate?: Date;
  prima?: number;
  flotacion?: number;
  cavali?: number;
}
