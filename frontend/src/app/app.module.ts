import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastMessagesService } from './shared/services/toast-messages/toast-messages.service';
import { SharedModuleGlobal } from './shared/shared.module';
import { CurrencyPipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModuleGlobal,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    CookieService,
    DialogService,
    CurrencyPipe,
    ToastMessagesService,
    ConfirmationService,
    MessageService,
  ],
})
export class AppModule {}
