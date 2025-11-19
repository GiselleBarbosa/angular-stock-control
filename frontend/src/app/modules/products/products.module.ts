import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsHomeComponent } from './pages/products-home/products-home.component';
import { RouterModule } from '@angular/router';
import { PRODUCTS_ROUTES } from './products.routing';

@NgModule({
  declarations: [ProductsHomeComponent],
  imports: [SharedModule, RouterModule.forChild(PRODUCTS_ROUTES)],
})
export class ProductsModule {}
