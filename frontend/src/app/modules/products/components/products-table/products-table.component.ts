import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'src/app/enum/productEvent.enum';
import { DeleteProductEvent } from 'src/app/interfaces/delete-product-event-interface';
import { EventAction } from 'src/app/interfaces/event-action-interface';
import { Products } from 'src/app/interfaces/products-interface';

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
