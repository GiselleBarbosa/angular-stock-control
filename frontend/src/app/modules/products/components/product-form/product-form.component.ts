import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductEvent } from 'src/app/enum/productEvent.enum';
import { Severity } from 'src/app/enum/severity.enum';
import { Categories } from 'src/app/interfaces/categories-interface';
import { EventAction } from 'src/app/interfaces/event-action-interface';
import { Products } from 'src/app/interfaces/products-interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products/products-data-transfer.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages/toast-messages.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: [],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly detroy$ = new Subject<void>();
  public categoriesData!: Categories.CategoriesResponse[];
  public selectedCategory: { name: string; code: string }[] = [];
  public productAction!: {
    event: EventAction;
    productData: Products.ProductsResponse[];
  };
  public productSelectedData!: Products.ProductsResponse;
  public saleProductSelectedData!: Products.ProductsResponse;
  public renderDropDownEditCategoryForm = false;
  public productData!: Products.ProductsResponse[];

  public addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  });

  public editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: [0, Validators.required],
    category_id: ['', Validators.required],
  });

  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT;
  public saleProductAction = ProductEvent.SALE_PRODUCT_EVENT;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private toastMessageService: ToastMessagesService,
    private productsDataTransferService: ProductsDataTransferService,
    private ref: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.productAction = this.ref.data;

    this.productAction?.event?.action === this.saleProductAction &&
      this.getProductsData();

    this.getAllCategories();
    this.renderDropDownEditCategoryForm = true;
  }

  getAllCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.detroy$))
      .subscribe({
        next: response => {
          if (response.length > 0) {
            if (
              this.productAction?.event?.action === this.editProductAction &&
              this.productAction.productData
            ) {
              this.getProductsSelectedData(this.productAction.event.id as string);
            }
            this.categoriesData = response;
          }
        },
      });
  }

  handleSubmitAddProduct(): void {
    if (this.addProductForm?.value && this.addProductForm?.valid) {
      const requestCreateProduct: Products.CreateProductRequest = {
        name: this.addProductForm?.value.name as string,
        price: this.addProductForm?.value.price as string,
        description: this.addProductForm?.value.description as string,
        category_id: this.addProductForm?.value.category_id as string,
        amount: Number(this.addProductForm?.value.amount),
      };

      this.productsService
        .createProduct(requestCreateProduct)
        .pipe(takeUntil(this.detroy$))
        .subscribe({
          next: response => {
            if (response) {
              this.toastMessageService.show(
                Severity.SUCCESS,
                'Operação concluída',
                'Produto criado com sucesso.'
              );
            }
            this.addProductForm.reset();
          },
          error: error => {
            console.error(error);
            this.toastMessageService.show(
              Severity.ERROR,
              'Falha na operação',
              'Houve um erro ao criar o produto.'
            );
          },
        });
    }
  }

  handleSubmitEditProduct(): void {
    if (
      this.editProductForm.value &&
      this.editProductForm.valid &&
      this.productAction.event.id
    ) {
      const requestEditProduct: Products.EditProductRequest = {
        name: this.editProductForm?.value.name as string,
        price: this.editProductForm?.value.price as string,
        description: this.editProductForm?.value.description as string,
        product_id: this.productAction.event.id,
        amount: Number(this.editProductForm?.value.amount),
        category_id: this.editProductForm?.value.category_id as string,
      };

      this.productsService
        .editProduct(requestEditProduct)
        .pipe(takeUntil(this.detroy$))
        .subscribe({
          next: () => {
            this.toastMessageService.show(
              Severity.SUCCESS,
              'Operação concluída',
              'Produto editado com sucesso.'
            );

            this.editProductForm.reset();
          },
          error: error => {
            console.error(error);
            this.toastMessageService.show(
              Severity.ERROR,
              'Falha na operação',
              'Houve um erro ao editar o produto.'
            );
          },
        });
    }
  }

  getProductsSelectedData(productId: string): void {
    const allProducts = this.productAction?.productData;

    if (allProducts && allProducts.length > 0) {
      const productFiltered = allProducts.filter(produto => produto.id === productId);

      if (productFiltered && productFiltered.length > 0) {
        this.productSelectedData = productFiltered[0];

        this.editProductForm.patchValue({
          name: this.productSelectedData.name,
          price: this.productSelectedData?.price,
          amount: this.productSelectedData?.amount,
          description: this.productSelectedData?.description,
          category_id: this.productSelectedData.category.id,
        });
      }
    }
  }

  getProductsData(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.detroy$))
      .subscribe({
        next: response => {
          if (response.length > 0) {
            this.productData = response;
            this.productData &&
              this.productsDataTransferService.setProducstData(this.productData);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }
}
