import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Severity } from 'src/app/enum/severity.enum';
import { EventAction } from 'src/app/interfaces/event-action-interface';
import { Products } from 'src/app/interfaces/products-interface';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages/toast-messages.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  public productList: Products.ProductsResponse[] = [];
  public ref!: DynamicDialogRef;

  constructor(
    private productsService: ProductsService,
    private productsDataTransferService: ProductsDataTransferService,
    private router: Router,
    private toastMessageService: ToastMessagesService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsData();
  }

  getServiceProductsData(): void {
    const produtosCarregados = this.productsDataTransferService.getProducstData();

    if (produtosCarregados.length > 0) {
      this.productList = produtosCarregados;
    } else this.getAPIProductsData();
  }

  getAPIProductsData(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          this.productList = response ?? [];
        },
        error: error => {
          console.error(error);

          this.toastMessageService.show(
            Severity.ERROR,
            'Erro inesperado',
            'Não foi possível exibir os produtos.'
          );
          setTimeout(() => {
            this.router.navigate(['./dashboard']);
          }, 2600);
        },
      });
  }

  handleProductAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(ProductFormComponent, {
        header: event.action,
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          productData: this.productList,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPIProductsData(),
      });
    }
  }

  handleDeleteProductAction(event: { product_id: string; productName: string }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto ${event.productName}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'sim',
        rejectLabel: 'não',
        accept: () => {
          this.deleteProduct(event.product_id);
        },
        reject: () => {
          this.confirmationService.close();
        },
      });
    }
  }

  deleteProduct(product_id: string) {
    this.productsService
      .deleteProduct(product_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          if (response) {
            this.toastMessageService.show(
              Severity.SUCCESS,
              'Operação confirmada',
              'Produto removido com sucesso.',
              3000
            );

            this.getServiceProductsData();
          }
        },
        error: error => {
          console.error(error);
          this.toastMessageService.show(
            Severity.ERROR,
            'Falha na operação',
            'Erro ao remover produto.',
            3000
          );
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
