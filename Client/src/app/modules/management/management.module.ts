import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { ManagementRoutingModule } from './management-routing.module';
import { FacultyComponent } from './components/faculty/faculty.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { SPECIALTIES_API_URL, DISCIPLINES_API_URL, TEACHERS_API_URL, FACULTIES_API_URL} from './app-injection';
import { environment } from 'src/environments/environment';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';

@NgModule({
  declarations: [
    DisciplinesComponent,
    FacultyComponent,
    ManagementPageComponent,
    HeaderComponent,
    TeachersComponent,
    SpecialtiesComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: FACULTIES_API_URL,
      useValue: environment.facultyUrl
    },
    {
      provide: DISCIPLINES_API_URL,
      useValue: environment.disciplinesUrl
    },
    {
      provide: TEACHERS_API_URL,
      useValue: environment.teachersUrl
    },
    {
      provide: SPECIALTIES_API_URL,
      useValue: environment.specialtiesUrl
    }
  ],
})
export class ManagementModule { }
