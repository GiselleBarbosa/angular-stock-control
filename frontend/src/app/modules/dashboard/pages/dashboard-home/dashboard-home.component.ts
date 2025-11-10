import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Severity } from 'src/app/enum/severity.enum';
import { Products } from 'src/app/interfaces/products-interface';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastMessagesService } from 'src/app/services/toast-messages/toast-messages.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
  standalone: false,
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  productsList: Products.ProductsResponse[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private toastMessageService: ToastMessagesService,
    private productDataTransfer: ProductsDataTransferService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          if (response.length > 0) {
            this.productsList = response;
            this.productDataTransfer.setProducstData(response);
            console.log('Products: ', response);
          }
        },
        error: error => {
          setTimeout(() => {
            this.toastMessageService.show(
              Severity.ERROR,
              'Erro inesperado',
              'Não foi possível exibir os produtos.',
              3500
            );
          }, 2000);

          console.error('Erro inesperado: ', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
