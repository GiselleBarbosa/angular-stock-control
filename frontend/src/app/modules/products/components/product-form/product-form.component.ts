import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Severity } from 'src/app/enum/severity.enum';
import { Categories } from 'src/app/interfaces/categories-interface';
import { Products } from 'src/app/interfaces/products-interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages/toast-messages.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: [],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly detroy$ = new Subject<void>();

  categoriesData!: Categories.CategoriesResponse[];
  selectedCategory: { name: string; code: string }[] = [];

  addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  });

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private toastMessageService: ToastMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.detroy$))
      .subscribe({
        next: response => {
          if (response.length > 0) {
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

  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }
}
