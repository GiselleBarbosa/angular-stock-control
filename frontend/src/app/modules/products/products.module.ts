import { NgModule } from '@angular/core';
import { ProductsHomeComponent } from './pages/products-home/products-home.component';
import { RouterModule } from '@angular/router';
import { PRODUCTS_ROUTES } from './products.routing';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages/toast-messages.service';
import { SharedModuleGlobal } from 'src/app/shared/shared.module';
import { ProductsTableComponent } from './components/products-table/products-table.component';

@NgModule({
  declarations: [ProductsHomeComponent, ProductsTableComponent],
  imports: [SharedModuleGlobal, RouterModule.forChild(PRODUCTS_ROUTES)],
  providers: [ToastMessagesService],
})
export class ProductsModule {}
