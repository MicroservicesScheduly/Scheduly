import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogDisciplinesData } from '../models/IDalogDisciplinesData.model';
import { IDialogTeachersData } from '../models/IDalogTeachersData.model';
import { IDialogData } from '../models/IDialogData.model';
import { AddCatalogWindowComponent } from '../windows/add-catalog-window/add-catalog-window.component';
import { AddTeacherWindowComponent } from '../windows/add-teacher-window/add-teacher-window.component';
import { ChangeCatalogWindowComponent } from '../windows/change-catalog-window/change-catalog-window.component';
import { ShowDisciplineTeachersWindowComponent } from '../windows/show-discipline-teachers-window/show-discipline-teachers-window.component';
import { ShowTeacherDisciplinesWindowComponent } from '../windows/show-teacher-disciplines-window/show-teacher-disciplines-window.component';

@Injectable({ providedIn: 'root' })
export class WindowService {
    constructor(private dialog: MatDialog) {}

    openAddTeacherDialog(data: IDialogData) {
        return this.dialog
            .open(AddTeacherWindowComponent, {
                data,
                disableClose: true,
            })
            .afterClosed();
    }

    openAddCatalogDialog(data: IDialogData) {
        return this.dialog
            .open(AddCatalogWindowComponent, {
                data,
                disableClose: true,
            })
            .afterClosed();
    }

    openChangeCatalogDialog(data: IDialogData) {
        return this.dialog
            .open(ChangeCatalogWindowComponent, {
                data,
                disableClose: true,
            })
    }

    openShowTeachersListDialog(data: IDialogTeachersData) {
        return this.dialog
        .open(ShowDisciplineTeachersWindowComponent, {
            data
        })
    }

    openShowDisciplinesListDialog(data: IDialogDisciplinesData) {
        return this.dialog
        .open(ShowTeacherDisciplinesWindowComponent, {
            data
        })
    }
}
