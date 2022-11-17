import { Faculty } from "src/app/modules/management/models/faculty.model";
import { IDialogButton } from "./IDialogButton.model";

export interface IDialogFacultiesData {
    title: string;
    message?: string;
    buttons?: IDialogButton[];
    faculty: Faculty;
}