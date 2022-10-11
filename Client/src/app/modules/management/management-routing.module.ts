import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinesComponent } from './disciplines/disciplines.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'disciplines',
  pathMatch: 'full',
},
{
  path: 'disciplines',
  component: DisciplinesComponent,
},
{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
