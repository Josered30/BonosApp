import { BondCalculatorInfo } from "./bondCalculatorInfo";
import { Frequency } from "./enums/frequency";


export interface BondCalculatorOutput {
  couponFrequency?: Frequency;
  capitalizationDays?: number;
  periodsPerYear?: number;
  totalPeriods?: number;
  annualEfectiveRate?: number;
  annualCok?: number;
  initialEmmiterCosts?: number;
  initialHolderCosts?: number;
  currentPrice?: number;
  calculatorInfo: BondCalculatorInfo[];
}
