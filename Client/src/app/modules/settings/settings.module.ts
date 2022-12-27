import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { EiTeamManagementComponent } from './components/ei-team/eiteam-management.component';
import { ChooseEIComponent } from './components/choose-ei/choose-ei.component';

@NgModule({
  declarations: [
    SettingsPageComponent,
    EiTeamManagementComponent,
    ChooseEIComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
  ],
  providers: [],
})
export class SettingsModule { }