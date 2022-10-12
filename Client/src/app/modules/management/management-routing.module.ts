import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinesComponent } from './components/disciplines/disciplines.component';
import { FacultyComponent } from './components/faculty/faculty.component';
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
              path: '**',
              redirectTo: 'disciplines',
          },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
