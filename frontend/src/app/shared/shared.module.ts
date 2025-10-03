import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

const PRIMENG = [CardModule, InputTextModule, ToastModule, ButtonModule, SidebarModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, PRIMENG
  ],
  exports: [
    PRIMENG
  ],
  providers: [
    CookieService,
    MessageService
  ],
})
export class SharedModule { }
