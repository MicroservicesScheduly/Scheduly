import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { FacultyComponent } from './components/faculty/faculty.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SpecialtiesComponent } from './components/specialties/specialties.component';
import { ManagementPageComponent } from './management-page/management-page.component';

const routes: Routes = [
  {
      path: '',
      component: ManagementPageComponent,
      children: [
          {
            path: 'disciplines',
            component: DisciplinesComponent,
          },
          {
            path: 'faculties',
            component: FacultyComponent,
          },
          {
            path: 'teachers',
            component: TeachersComponent,
          },
          {
            path: 'specialties',
            component: SpecialtiesComponent,
          },
          {
            path: '**',
            redirectTo: 'faculties',
          },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
