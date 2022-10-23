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

@NgModule({
  declarations: [
    ManagementEditPageComponent,
    EditDisciplinesComponent,
    CreateDisciplinesComponent,
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
