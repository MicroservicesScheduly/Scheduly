import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDisciplinesComponent } from './components/create-disciplines/create-disciplines.component';
import { EditDisciplinesComponent } from './components/edit-disciplines/edit-disciplines.component';
import { CreateTeachersComponent } from './components/create-teachers/create-teachers.component';
import { EditTeachersComponent } from './components/edit-teachers/edit-teachers.component';
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
        {
          path: 'create-teacher',
          component: CreateTeachersComponent,
        },
        {
          path: 'edit-teacher/:id',
          component: EditTeachersComponent,
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementEditRoutingModule { }
