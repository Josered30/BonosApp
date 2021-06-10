import { BondCalculatorInfo } from "./bondCalculatorInfo";
import { EnumType } from "./enumType";

export interface BondCalculatorOutput {
  couponFrequency?: EnumType;
  capitalizationDays?: EnumType;
  periodsPerYear?: number;
  totalPeriods?: number;
  annualEfectiveRate?: number;
  annualCok?: number;
  initialEmmiterCosts?: number;
  initialHolderCosts?: number;
  currentPrice?: number;
  data: BondCalculatorInfo[];
}
