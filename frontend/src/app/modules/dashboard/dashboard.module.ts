import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DASHBOARDS_ROUTES } from './dashboard.routing';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [RouterModule.forChild(DASHBOARDS_ROUTES), SharedModule, CommonModule],
  declarations: [DashboardHomeComponent],
})
export class DashboardModule {}
