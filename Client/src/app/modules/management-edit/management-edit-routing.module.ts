import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDisciplinesComponent } from './components/create-disciplines/create-disciplines.component';
import { EditDisciplinesComponent } from './components/edit-disciplines/edit-disciplines.component';
import { ManagementEditPageComponent } from './management-edit-page/management-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementEditPageComponent,
    children: [
        {
          path: 'create-discipline',
          component: CreateDisciplinesComponent,
        },
        {
          path: 'edit-discipline/:id',
          component: EditDisciplinesComponent,
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementEditRoutingModule { }
