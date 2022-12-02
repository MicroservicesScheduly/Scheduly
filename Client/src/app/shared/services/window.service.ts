import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDialogDisciplinesData } from '../models/IDalogDisciplinesData.model';
import { IDialogTeachersData } from '../models/IDalogTeachersData.model';
import { IDialogData } from '../models/IDialogData.model';
import { IDialogFacultiesData } from '../models/IDialogFacultiesData.model';
import { AddCatalogWindowComponent } from '../windows/add-catalog-window/add-catalog-window.component';
import { AddTeacherWindowComponent } from '../windows/add-teacher-window/add-teacher-window.component';
import { ChangeCatalogWindowComponent } from '../windows/change-catalog-window/change-catalog-window.component';
import { ChooseDisciplineTeacherWindowComponent } from '../windows/choose-discipline-teacher-window/choose-discipline-teacher-window.component';
import { ChooseDisciplineTypeWindowComponent } from '../windows/choose-discipline-type-window/choose-discipline-type-window.component';
import { ChooseDisciplineWindowComponent } from '../windows/choose-discipline-window/choose-discipline-window.component';
import { ShowDisciplineTeachersWindowComponent } from '../windows/show-discipline-teachers-window/show-discipline-teachers-window.component';
import { ShowFacultyDisciplinesWindowComponent } from '../windows/show-faculty-disciplines-window/show-faculty-disciplines-window.component';
import { ShowFacultySpecialtiesWindowComponent } from '../windows/show-faculty-specialties-window/show-faculty-specialties-window.component';
import { ShowFacultyTeachersWindowComponent } from '../windows/show-faculty-teachers-window/show-faculty-teachers-window.component';
import { ShowTeacherDisciplinesWindowComponent } from '../windows/show-teacher-disciplines-window/show-teacher-disciplines-window.component';
import { SubscribeWindowComponent } from '../windows/subscribe-window/subscribe-window.component';

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

    openShowFacultyDisciplinesListDialog(data: IDialogFacultiesData) {
        return this.dialog
        .open(ShowFacultyDisciplinesWindowComponent, {
            data
        })
    }

    openShowFacultyTeachersListDialog(data: IDialogFacultiesData) {
        return this.dialog
        .open(ShowFacultyTeachersWindowComponent, {
            data
        })
    }

    openShowFacultySpecialtiesListDialog(data: IDialogFacultiesData) {
        return this.dialog
        .open(ShowFacultySpecialtiesWindowComponent, {
            data
        })
    }

    openSubscribeDialog(data: IDialogData) {
        return this.dialog
        .open(SubscribeWindowComponent, {
            data,
            disableClose: true,
        })
    }

    openChooseDisciplineDialog(data: IDialogData) {
        return this.dialog
        .open(ChooseDisciplineWindowComponent, {
            data,
            disableClose: true,
        })
    }

    openChooseDisciplineTypeDialog(data: IDialogData) {
        return this.dialog
        .open(ChooseDisciplineTypeWindowComponent, {
            data,
            disableClose: true,
        })
    }

    openChooseDisciplineTeacherDialog(data: IDialogData) {
        return this.dialog
        .open(ChooseDisciplineTeacherWindowComponent, {
            data,
            disableClose: true,
        })
    }
}
