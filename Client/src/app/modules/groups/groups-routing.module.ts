import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsManagementComponent } from './components/groups-management/groups-management.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';

const routes: Routes = [
  {
      path: '',
      component: GroupsPageComponent,
      children: [
          {
            path: 'management',
            component: GroupsManagementComponent,
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
export class GroupsRoutingModule { }