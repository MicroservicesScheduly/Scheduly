import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';

const routes: Routes = [
  {
      path: '',
      component: AuthorizationPageComponent,
      children: [
          {
            path: 'signin',
            component: SigninComponent,
          },
          {
            path: 'registration',
            component: RegistrationComponent,
          },
          {
            path: '**',
            redirectTo: 'signin',
          },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
