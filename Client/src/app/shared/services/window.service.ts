import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogData } from '../models/IDialogData.model';
import { AddTeacherWindowComponent } from '../windows/add-teacher-window/add-teacher-window.component';

@Injectable({ providedIn: 'root' })
export class WindowService {
    constructor(private dialog: MatDialog) {}

    openAddTeacherDialog(data: IDialogData) {
        return this.dialog
            .open(AddTeacherWindowComponent, {
                data,
            })
            .afterClosed();
    }
}
