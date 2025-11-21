import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    redirectTo: 'HomeComponent',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
