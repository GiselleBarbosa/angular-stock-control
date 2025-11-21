import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  ConfirmDialogModule,
  ToolbarModule,
  TableModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  DynamicDialogModule,
  DropdownModule,
  TooltipModule,
  ProgressSpinnerModule,
];

@NgModule({
  declarations: [ToolbarNavigationComponent],
  imports: [...IMPORTS, ...PRIMENG],
  exports: [...PRIMENG, ToolbarNavigationComponent, IMPORTS],
})
export class SharedModuleGlobal {}
