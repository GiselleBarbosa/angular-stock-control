import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

const PRIMENG = [CardModule, InputTextModule, ToastModule, ButtonModule, SidebarModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, PRIMENG
  ],
  exports: [
    PRIMENG
  ]
})
export class SharedModule { }
