import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DisciplinesComponent } from './disciplines/disciplines.component';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementPageComponent } from './management/management-page.component';

@NgModule({
  declarations: [
    DisciplinesComponent,
    ManagementPageComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule
  ],
  providers: [],
})
export class ManagementModule { }
