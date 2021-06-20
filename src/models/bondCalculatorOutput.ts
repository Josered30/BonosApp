import { BondCalculatorInfo } from "./bondCalculatorInfo";
import { Frequency } from "./enums/frequency";


export interface BondCalculatorOutput {
  couponFrequency: number;
  capitalization: number;
  periodsPerYear: number;
  totalPeriods: number;
  annualEfectiveRate: number;
  couponEfectiveRate: number;
  couponCok: number; 
  initialEmmiterCosts: number;
  initialHolderCosts: number;
  currentPrice: number;
  calculatorInfo: BondCalculatorInfo[];
  accumulatedBond?: number;
}
