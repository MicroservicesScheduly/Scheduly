import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddTeacherWindowComponent } from './windows/add-teacher-window/add-teacher-window.component';
import { SharedRoutingModule } from './shared-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AddCatalogWindowComponent } from './windows/add-catalog-window/add-catalog-window.component';
import { ChangeCatalogWindowComponent } from './windows/change-catalog-window/change-catalog-window.component';
import { ShowDisciplineTeachersWindowComponent } from './windows/show-discipline-teachers-window/show-discipline-teachers-window.component';
import { ShowTeacherDisciplinesWindowComponent } from './windows/show-teacher-disciplines-window/show-teacher-disciplines-window.component';
import { ShowFacultyDisciplinesWindowComponent } from './windows/show-faculty-disciplines-window/show-faculty-disciplines-window.component';
import { ShowFacultySpecialtiesWindowComponent } from './windows/show-faculty-specialties-window/show-faculty-specialties-window.component';
import { ShowFacultyTeachersWindowComponent } from './windows/show-faculty-teachers-window/show-faculty-teachers-window.component';
import { SubscribeWindowComponent } from './windows/subscribe-window/subscribe-window.component';
import { ChooseDisciplineWindowComponent } from './windows/choose-discipline-window/choose-discipline-window.component';
import { ChooseDisciplineTypeWindowComponent } from './windows/choose-discipline-type-window/choose-discipline-type-window.component';
import { ChooseDisciplineTeacherWindowComponent } from './windows/choose-discipline-teacher-window/choose-discipline-teacher-window.component';
import { ChooseCatalogComponent } from './windows/choose-discipline-window/choose-catalog/choose-catalog.component';


@NgModule({
  declarations: [
    AddTeacherWindowComponent,
    AddCatalogWindowComponent,
    ChangeCatalogWindowComponent,
    ShowDisciplineTeachersWindowComponent,
    ShowTeacherDisciplinesWindowComponent,
    ShowFacultyDisciplinesWindowComponent,
    ShowFacultySpecialtiesWindowComponent,
    ShowFacultyTeachersWindowComponent,
    SubscribeWindowComponent,
    ChooseDisciplineWindowComponent,
    ChooseDisciplineTypeWindowComponent,
    ChooseDisciplineTeacherWindowComponent,
    ChooseCatalogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ChooseDisciplineTeacherWindowComponent
  ]
})
export class SharedModule { }
