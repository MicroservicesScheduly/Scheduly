import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/header/header-component/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { GroupComponent } from './components/group/group.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';
import { ScheduleRoutingModule } from './schedule-routing.module';

@NgModule({
  declarations: [
    SchedulePageComponent,
    GroupComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
  ],
  providers: [],
})
export class ScheduleModule { }