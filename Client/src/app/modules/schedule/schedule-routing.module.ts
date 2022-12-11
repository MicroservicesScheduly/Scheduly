import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EditGroupScheduleComponent } from './components/edit-group-schedule/edit-group-schedule.component';
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
            path: 'edit-group-schedule',
            component: EditGroupScheduleComponent,
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