import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddTeacherWindowComponent } from './windows/add-teacher-window/add-teacher-window.component';
import { SharedRoutingModule } from './shared-routing.module';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AddTeacherWindowComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
