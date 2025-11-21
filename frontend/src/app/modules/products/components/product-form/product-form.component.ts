import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Categories } from 'src/app/interfaces/categories-interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
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
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.detroy$.next();
    this.detroy$.complete();
  }
}
