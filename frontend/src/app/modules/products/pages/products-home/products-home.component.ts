import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, Subject, takeUntil } from 'rxjs';
import { Severity } from 'src/app/enum/severity.enum';
import { Products } from 'src/app/interfaces/products-interface';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastMessagesService } from 'src/app/services/toast-messages/toast-messages.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: [],
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly detroy$: Subject<void> = new Subject();
  public productList: Products.ProductsResponse[] = [];

  constructor(
    private productsService: ProductsService,
    private productsDataTransferService: ProductsDataTransferService,
    private router: Router,
    private toastMessageService: ToastMessagesService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsData();
  }

  getServiceProductsData() {
    const produtosCarregados = this.productsDataTransferService.getProducstData();

    if (produtosCarregados.length > 0) {
      this.productList = produtosCarregados;
      console.log('IF');
    } else {
      this.getAPIProductsData();
      console.log('ELSE');
    }
  }

  getAPIProductsData() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.detroy$))
      .subscribe({
        next: response => {
          this.productList = response ?? [];
          console.log('  getAPIProductsData()  this.productLista  ', this.productList);
        },
        error: error => {
          console.error(error);
          this.router.navigate(['./dashboard']);
          this.toastMessageService.show(
            Severity.ERROR,
            'Erro',
            'Houve um erro ao carregar a lista de produtos'
          );
        },
      });
  }

  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }
}
