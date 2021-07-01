import { BondCalculatorInfo } from "../bondCalculatorInfo";
import { BondCalculatorInput } from "../bondCalculatorInput";
import { BondCalculatorOutput } from "../bondCalculatorOutput";

export interface Bond {
    id: number;
    bondInput: BondCalculatorInput;
    bondOutput: BondCalculatorOutput;
    bondInfo: BondCalculatorInfo[];
}