import { Frequency } from "./enums/frequency";
import { Rate } from "./enums/rate";


export interface BondCalculatorInput {
  nominalValue?: number;
  commercialValue?: number;
  year?: number;
  couponFrequency?: Frequency;
  daysPerYear?: number;
  interestRateType?: Rate;
  capitalization?: Frequency;
  interestRate?: number;
  annualDiscountRate?: number;
  incomeTax?: number;
  emmitionDate?: Date;
  prima?: number;
  flotacion?: number;
  cavali?: number;
}
