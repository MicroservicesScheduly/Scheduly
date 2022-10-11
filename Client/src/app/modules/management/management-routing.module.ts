import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { ManagementPageComponent } from './management/management-page.component';

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
