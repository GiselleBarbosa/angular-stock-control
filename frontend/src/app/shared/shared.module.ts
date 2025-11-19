import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';

import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ToastMessagesService } from './services/toast-messages/toast-messages.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

const IMPORTS = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  HttpClientModule,
];

const PRIMENG = [
  CardModule,
  InputTextModule,
  ToastModule,
  ButtonModule,
  SidebarModule,
  ChartModule,
  ToolbarModule,
  TableModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  DynamicDialogModule,
  DropdownModule,
  ConfirmDialogModule,
  TooltipModule,
  ProgressSpinnerModule,
];

@NgModule({
  declarations: [ToolbarNavigationComponent],
  imports: [IMPORTS, PRIMENG],
  exports: [PRIMENG, ToolbarNavigationComponent, IMPORTS],
  providers: [CookieService, DialogService, CurrencyPipe, ToastMessagesService],
})
export class SharedModuleGlobal {}
