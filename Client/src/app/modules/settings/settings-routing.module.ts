import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EiTeamManagementComponent } from './components/ei-team/eiteam-management.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
  {
      path: '',
      component: SettingsPageComponent,
      canActivate: [AuthGuard],
      children: [
          {
            path: 'management',
            component: EiTeamManagementComponent,
          },
          {
            path: '**',
            redirectTo: 'management',
          },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }