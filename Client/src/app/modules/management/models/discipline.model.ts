import { CreditType } from "../enums/credit-type.model";

export interface IDiscipline {
    id: number;
    name: string;
    description: string;
    course: number;
    creditType: number;
    hours: number;
    isSelective: boolean;
    catalogId?: number;
}