export interface BondCalculatorInfo {
  index?: number;
  date?: string;
  gracePeriod?: string;
  bound?: number;
  coupon?: number;
  fee?: number;
  amortization?: number;
  prima?: number;
  shield?: number;
  emmiterFlow?: number;
  emmiterShieldFlow?: number;
  holderFlow?: number;
}
