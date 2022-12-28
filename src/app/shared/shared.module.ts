import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    ModalComponent,
   ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SearchComponent,
    ModalComponent
  ]
})
export class SharedModule { }
