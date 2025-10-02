import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';

export const DASHBOARDS_ROUTES: Routes = [
  {
    path: '',
    component: DashboardHomeComponent
  }
];