import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Severity } from 'src/app/enum/severity.enum';
import { Categories } from 'src/app/interfaces/categories-interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages/toast-messages.service';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss'],
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public categoriesList!: Categories.CategoriesResponse[];

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private toastMessagesService: ToastMessagesService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: response => {
          if (response.length > 0) {
            this.categoriesList = response;
          }
        },
        error: error => {
          console.error(error);
          this.toastMessagesService.show(
            Severity.ERROR,
            'Erro',
            'Houve um erro ao buscar as categorias'
          );
          this.router.navigate(['/dashboard']);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
