import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/shared/header/header-component/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { RegistrationComponent } from './components/registration/registration.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthorizationPageComponent } from './authorization-page/authorization-page.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';
import { ACCESS_TOKEN, UsersService } from 'src/app/shared/services/users.service';
import { JwtHelperService, JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}
@NgModule({
  declarations: [
    AuthorizationPageComponent,
    RegistrationComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,


    JwtModule.forRoot({
      config:{
        tokenGetter: getToken,
        allowedDomains:["localhost:4200", "http://192.168.59.129", "http://192.168.59.129/"]
      }
    })
  ],

  providers: [UsersService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
})
export class AuthorizationModule { }