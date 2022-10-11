import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementPageComponent } from './management/management-page.component';

@NgModule({
  declarations: [
    DisciplinesComponent,
    ManagementPageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule
  ],
  providers: [],
})
export class ManagementModule { }
