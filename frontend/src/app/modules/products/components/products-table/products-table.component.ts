import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'src/app/enum/productEvent.enum';
import { EventAction } from 'src/app/interfaces/event/event-action-interface';
import { DeleteProductEvent } from 'src/app/interfaces/event/product/delete-product-event-interface copy';
import { Products } from 'src/app/interfaces/product/products-interface';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {
  @Input() products: Products.ProductsResponse[] = [];
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProductEvent>();

  produtoSelecionado!: Products.ProductsResponse;
  addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEvent = id && id !== '' ? { action, id } : { action };
      this.productEvent.emit(productEvent);
    }
  }

  handleDeleteProduct(product_id: string, productName: string): void {
    if (product_id !== '' && productName !== '') {
      this.deleteProductEvent.emit({ product_id, productName });
    }
  }
}
