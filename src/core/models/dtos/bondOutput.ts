import { BondCalculatorInfo } from "./bondInfo";

export interface BondCalculatorOutput {
  id: number;
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
  irr?: number;
  modifiedDuration?: number;
}
