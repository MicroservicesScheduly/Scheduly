import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ManagementEditRoutingModule } from './management-edit-routing.module';
import { ManagementEditPageComponent } from './management-edit-page/management-edit-page.component';
import { HeaderComponent } from 'src/app/shared/header/header-component/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CreateDisciplinesComponent } from './components/create-disciplines/create-disciplines.component';
import { EditDisciplinesComponent } from './components/edit-disciplines/edit-disciplines.component';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { CreateTeachersComponent } from './components/create-teachers/create-teachers.component';
import { EditTeachersComponent } from './components/edit-teachers/edit-teachers.component';
import { CreateFacultiesComponent } from './components/create-faculties/create-faculties.component';
import { EditFacultiesComponent } from './components/edit-faculties/edit-faculties.component';
import { CreateSpecialtiesComponent } from './components/create-specialties/create-specialties.component';
import { EditSpecialtiesComponent } from './edit-specialties/edit-specialties.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';

@NgModule({
  declarations: [
    ManagementEditPageComponent,
    EditDisciplinesComponent,
    CreateDisciplinesComponent,
    CreateTeachersComponent,
    EditTeachersComponent,
    CreateSpecialtiesComponent,
    EditSpecialtiesComponent,
    CreateFacultiesComponent,
    EditFacultiesComponent,
    CreateGroupComponent,
  ],
  imports: [
    CommonModule,
    ManagementEditRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
  ],
  providers: [],
})
export class ManagementEditModule { }
