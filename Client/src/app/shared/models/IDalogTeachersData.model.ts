import { IDiscipline } from "src/app/modules/management/models/discipline.model";
import { IDialogButton } from "./IDialogButton.model";

export interface IDialogTeachersData {
    title: string;
    message?: string;
    buttons?: IDialogButton[];
    discipline: IDiscipline;
    showLecturers: boolean;
}