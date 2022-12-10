import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header-component/header.component';
import { HeaderRoutingModule } from './header-routing.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    HeaderRoutingModule,
    CommonModule,
    FormsModule     
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [],
})
export class HeaderModule { }
