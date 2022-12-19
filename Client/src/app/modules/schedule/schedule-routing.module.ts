import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { EditGroupScheduleComponent } from './components/edit-group-schedule/edit-group-schedule.component';
import { GroupComponent } from './components/group/group.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ExternalSchedulePageComponent } from './external-schedule-page/external-schedule-page.component';
import { SchedulePageComponent } from './schedule-page/schedule-page.component';

const routes: Routes = [
  {
      path: '',
      component: SchedulePageComponent,
      children: [
          {
            path: 'group',
            component: GroupComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'edit-group-schedule',
            component: EditGroupScheduleComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'teacher',
            component: TeacherComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'external',
            component: ExternalSchedulePageComponent,
            children: [
              {
                path: 'group/:id',
                component: GroupComponent,
              },
              {
                path: 'teacher/:id',
                component: TeacherComponent,
              },
              {
                path: '**',
                redirectTo: 'group/:id',
              },
            ]
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