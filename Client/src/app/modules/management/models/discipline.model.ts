import { CreditType } from "../enums/credit-type.model";

export interface IDiscipline {
    name: string;
    description: string;
    course: number;
    creditType: CreditType;
    hours: number;
    isSelective: boolean;
    catalog: string;
}
