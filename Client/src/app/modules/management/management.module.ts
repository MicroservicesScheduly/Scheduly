import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { ManagementRoutingModule } from './management-routing.module';
import { FacultyComponent } from './components/faculty/faculty.component';
import { ManagementPageComponent } from './management-page/management-page.component';
import { HttpClientModule } from '@angular/common/http';
/*import { SPECIALTIES_API_URL, DISCIPLINES_API_URL, TEACHERS_API_URL, FACULTIES_API_URL} from './app-injection';*/
import { environment } from 'src/environments/environment';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { HeaderComponent } from 'src/app/shared/header/header-component/header.component';

@NgModule({
  declarations: [
    DisciplinesComponent,
    FacultyComponent,
    ManagementPageComponent,
    TeachersComponent,
    SpecialtiesComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    HttpClientModule,
    HeaderModule,
  ],
  providers: [],
})
export class ManagementModule { }
