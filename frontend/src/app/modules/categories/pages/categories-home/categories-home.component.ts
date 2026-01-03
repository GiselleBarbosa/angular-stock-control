import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Severity } from 'src/app/enum/severity.enum';
import { Categories } from 'src/app/interfaces/category/categories-interface';
import { DeleteCategoryEvent } from 'src/app/interfaces/event/category/delete-category-event-interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages/toast-messages.service';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';
import { EventAction } from 'src/app/interfaces/event/event-action-interface';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss'],
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public categoriesList!: Categories.CategoriesResponse[];
  public ref!: DynamicDialogRef;

  constructor(
    private categoriesService: CategoriesService,
    private toastMessagesService: ToastMessagesService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private dialogService: DialogService
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

  handleDeleteCategoryEvent(event: DeleteCategoryEvent) {
    if (event) {
      this.confirmationService.confirm({
        header: 'Confirmação de exclusão',
        message: `Tem certeza que deseja remover a categoria ${event.categoryName}?`,
        icon: 'pi pi exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.deleteCategory(event.category_id);
        },
      });
    }
  }

  handleCategoryAction(event: EventAction): void {
    if (event) {
      this.ref = this.dialogService.open(CategoryFormComponent, {
        header: event.action,
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
        },
      });
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAllCategories(),
      });
    }
  }

  deleteCategory(category_id: string) {
    if (category_id) {
      this.categoriesService
        .deleteCategory({ category_id })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toastMessagesService.show(
              Severity.SUCCESS,
              'Sucesso',
              'Categoria removida com sucesso!'
            );
            this.confirmationService.close();
            if (this.ref) {
              this.ref.close(true);
            }
            this.getAllCategories();
          },
          error: error => {
            console.error(error);
            this.toastMessagesService.show(
              Severity.ERROR,
              'Erro',
              'Houve um erro ao remover a categoria'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
