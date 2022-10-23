import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header-component/header.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    HeaderRoutingModule,
    CommonModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [],
})
export class HeaderModule { }
