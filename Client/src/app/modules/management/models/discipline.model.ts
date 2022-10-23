import { CreditType } from "../enums/credit-type.model";
import { ICatalog } from "./catalog.model";

export interface IDiscipline {
    id: number;
    name: string;
    description: string;
    course: number;
    creditType: CreditType;
    hours: number;
    isSelective: boolean;
    catalog?: ICatalog;
}
