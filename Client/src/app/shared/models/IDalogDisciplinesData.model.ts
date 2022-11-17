import { IDiscipline } from "src/app/modules/management/models/discipline.model";
import { ITeacher } from "src/app/modules/management/models/teacher.model";
import { IDialogButton } from "./IDialogButton.model";

export interface IDialogDisciplinesData {
    title: string;
    message?: string;
    buttons?: IDialogButton[];
    teacher: ITeacher;
    disciplinesOfTeacher: IDiscipline[];
}