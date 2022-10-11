import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { ManagementRoutingModule } from './management-routing.module';
import { FacultyComponent } from './components/faculty/faculty.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { HeaderComponent } from '../../shared/header/header.component';

@NgModule({
  declarations: [
    DisciplinesComponent,
    FacultyComponent,
    ManagementPageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule
  ],
  providers: [],
})
export class ManagementModule { }
