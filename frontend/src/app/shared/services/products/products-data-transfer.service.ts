import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { Products } from 'src/app/interfaces/products-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public productsDataEmitter$ = new BehaviorSubject<Products.ProductsResponse[] | null>(null);
  public productsData: Products.ProductsResponse[] = [];
  constructor() { }

  setProducstData(products: Products.ProductsResponse[]): void {
    if (products) {
      this.productsDataEmitter$.next(products);
      this.getProducstData();
    }
  }

  getProducstData() {
    this.productsDataEmitter$.pipe(take(1),
      map(data => data?.filter(products => products.amount > 0))).subscribe({
        next: response => {
          if (response) {
            this.productsData = response;
          }
        },
        error: (error) => console.error(error)
      });
  }
}
