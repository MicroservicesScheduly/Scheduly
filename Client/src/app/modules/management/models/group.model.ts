import { Faculty } from "./faculty.model";
import { ISpecialty } from "./specialty.model";

export interface IGroup {
    id: number;
    cipher: string;
    course: number;
    facultyId: number;
    specialtyId: number;
    faculty?: Faculty;
    specialty?: ISpecialty;
}

export interface ISaveGroup {
    cipher: string;
    course: number;
    facultyId: number;
    specialtyId: number;
}