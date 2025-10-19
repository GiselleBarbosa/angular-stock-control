import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DASHBOARDS_ROUTES } from './dashboard.routing';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild(DASHBOARDS_ROUTES),
    SharedModule
  ],
  declarations: [
    DashboardHomeComponent
  ]
})
export class DashboardModule { }
