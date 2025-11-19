import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModuleGlobal } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastMessagesService } from './shared/services/toast-messages/toast-messages.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  providers: [ToastMessagesService, MessageService, ConfirmationService],
})
export class AppModule {}
