import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDisciplinesComponent } from './components/create-disciplines/create-disciplines.component';
import { EditDisciplinesComponent } from './components/edit-disciplines/edit-disciplines.component';
import { CreateTeachersComponent } from './components/create-teachers/create-teachers.component';
import { EditTeachersComponent } from './components/edit-teachers/edit-teachers.component';
import { ManagementEditPageComponent } from './management-edit-page/management-edit-page.component';
import { CreateFacultiesComponent } from './components/create-faculties/create-faculties.component';
import { EditFacultiesComponent } from './components/edit-faculties/edit-faculties.component';
import { CreateSpecialtiesComponent } from './components/create-specialties/create-specialties.component';
import { EditSpecialtiesComponent } from './edit-specialties/edit-specialties.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';

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
        {
          path: 'create-faculty',
          component: CreateFacultiesComponent,
        },
        {
          path: 'edit-faculty/:id',
          component: EditFacultiesComponent,
        },
        {
          path: 'create-group',
          component: CreateGroupComponent,
        },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementEditRoutingModule { }
