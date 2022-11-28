import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: '',
    redirectTo: 'management',
    pathMatch: 'full',
  },
  {
    path: 'management',
    loadChildren: () => import('./modules/management/management.module').then((m) => m.ManagementModule),
  },
  {
    path: 'management-edit',
    loadChildren: () => import('./modules/management-edit/management-edit.module')
        .then((m) => m.ManagementEditModule),
  },
  {
    path: 'authorization',
    loadChildren: () => import('./modules/authorization/authorization.module')
        .then((m) => m.AuthorizationModule),
  },
  {
    path: 'groups',
    loadChildren: () => import('./modules/groups/groups.module').then((m) => m.GroupsModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
