import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './components/group/group.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';

const routes: Routes = [
  {
      path: '',
      component: SchedulePageComponent,
      children: [
          {
            path: 'group',
            component: GroupComponent,
          },
          {
            path: '**',
            redirectTo: 'group',
          },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }