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
  ],
  providers: [],
})
export class AuthorizationModule { }