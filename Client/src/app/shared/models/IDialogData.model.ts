import { IDiscipline } from "src/app/modules/management/models/discipline.model";
import { IDialogButton } from "./IDialogButton.model";

export interface IDialogData {
    title: string;
    message?: string;
    buttons?: IDialogButton[];
    isLecturerAdded?: boolean;
    disciplineForCatalog?: IDiscipline;
}