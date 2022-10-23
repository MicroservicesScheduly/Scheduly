import { IDialogButton } from "./IDialogButton.model";

export interface IDialogData {
    title: string;
    message?: string;
    buttons?: IDialogButton[];
}