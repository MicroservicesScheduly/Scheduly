import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExternalHeaderComponent } from './external-header-component/external-header.component';
import { ExternalHeaderRoutingModule } from './external-header-routing.module';

@NgModule({
  declarations: [
    ExternalHeaderComponent
  ],
  imports: [
    ExternalHeaderRoutingModule,
    CommonModule,
    FormsModule     
  ],
  exports: [
    ExternalHeaderComponent,
  ],
  providers: [],
})
export class ExternalHeaderModule { }
