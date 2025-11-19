import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

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
];

@NgModule({
  declarations: [ToolbarNavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ...PRIMENG,
  ],
  exports: [...PRIMENG, ToolbarNavigationComponent],
  providers: [
    CookieService,
    MessageService,
    DialogService,
    CurrencyPipe,
    ConfirmationService,
  ],
})
export class SharedModule {}
