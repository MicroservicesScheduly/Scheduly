import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsPageComponent } from './groups-page/groups-page.component';

@NgModule({
  declarations: [
    GroupsPageComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
  ],
  providers: [],
})
export class GroupsModule { }