import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModuleGlobal } from 'src/app/shared/shared.module';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductsHomeComponent } from './pages/products-home/products-home.component';
import { PRODUCTS_ROUTES } from './products.routing';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [ProductsHomeComponent, ProductsTableComponent],
  imports: [SharedModuleGlobal, RouterModule.forChild(PRODUCTS_ROUTES)],
})
export class ProductsModule {}
