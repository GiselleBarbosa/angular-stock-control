import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { EventAction } from 'src/app/interfaces/event-action-interface';
import { Products } from 'src/app/interfaces/products-interface';
import { ProductFormComponent } from 'src/app/modules/products/components/product-form/product-form.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  productsList: Products.ProductsResponse[] = [];
  productsChartData!: ChartData;
  productsChartOptions!: ChartOptions;
  loading = true;
  showError = false;
  ref!: DynamicDialogRef;

  private destroy$ = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private productDataTransfer: ProductsDataTransferService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.loading = true;
    this.showError = false;

    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.loading = false;

          this.productsList = response ?? [];

          if (this.productsList.length > 0) {
            this.productDataTransfer.setProducstData(response);
            this.setProductsChartConfig();
          }
        },
        error: error => {
          this.loading = false;
          this.showError = true;
          console.error('Erro inesperado: ', error);
        },
      });
  }

  setProductsChartConfig(): void {
    if (this.productsList.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secomdary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.productsChartData = {
        labels: this.productsList.map(product => product.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
            data: this.productsList.map(product => product.amount),
          },
        ],
      };

      this.productsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: 'bold',
              },
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    }
  }

  createNewProduct(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(ProductFormComponent, {
        header: event.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          productList: this.productsList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAllProducts(),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
