import { EventEmitter } from "@angular/core";

export interface IDialogButton {
    title: string;
    onClickEvent: EventEmitter<void>;
}