import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { ManagementRoutingModule } from './management-routing.module';
import { FacultyComponent } from './components/faculty/faculty.component';

@NgModule({
  declarations: [
    DisciplinesComponent,
    FacultyComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule
  ],
  providers: [],
})
export class ManagementModule { }
