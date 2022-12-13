import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/header/header-component/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { GroupComponent } from './components/group/group.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ChooseGroupComponent } from './components/group/choose-group/choose-group.component';
import { ChooseSemesterComponent } from './components/group/choose-semester/choose-semester.component';
import { EditGroupScheduleComponent } from './components/edit-group-schedule/edit-group-schedule.component';
import { ChooseDisciplineTeacherWindowComponent } from 'src/app/shared/windows/choose-discipline-teacher-window/choose-discipline-teacher-window.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SchedulePageComponent,
    GroupComponent,
    ChooseGroupComponent,
    ChooseSemesterComponent,
    EditGroupScheduleComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule
  ],
  providers: [],
})
export class ScheduleModule { }