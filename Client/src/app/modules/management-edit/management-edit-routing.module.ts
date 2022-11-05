import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDisciplinesComponent } from './components/create-disciplines/create-disciplines.component';
import { EditDisciplinesComponent } from './components/edit-disciplines/edit-disciplines.component';
import { CreateSpecialtiesComponent } from './components/create-specialties/create-specialties.component';
import { EditSpecialtiesComponent } from './components/edit-specialties/edit-specialties.component';
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
        {
          path: 'create-specialty',
          component: CreateSpecialtiesComponent,
        },
        {
          path: 'edit-specialty/:id',
          component: EditSpecialtiesComponent,
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementEditRoutingModule { }
