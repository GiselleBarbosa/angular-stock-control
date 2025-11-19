import { Component, Input } from '@angular/core';
import { Products } from 'src/app/interfaces/products-interface';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {
  @Input() products: Products.ProductsResponse[] = [];

  produtoSelecionado!: Products.ProductsResponse;
}
