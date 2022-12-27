import { IScheduleDiscipline } from "src/app/modules/schedule/models/schedule.model";
import { IDialogButton } from "./IDialogButton.model";

export interface IReplaceDialogData {
    title: string;
    message?: string;
    buttons?: IDialogButton[];
    disciplineToReplace: IScheduleDiscipline;
    scheduleDisciplines: IScheduleDiscipline[];
}