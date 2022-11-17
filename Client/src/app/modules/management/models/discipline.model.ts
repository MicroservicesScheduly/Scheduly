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
    practicians?: number | undefined;
    lecturers?: number;
}

export interface ISaveDiscipline {
    name: string;
    description: string;
    course: number;
    creditType: number;
    hours: number;
    isSelective: boolean;
    catalogId?: number;
}