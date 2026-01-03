import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { CategoryEvent } from 'src/app/enum/categoryEvent.enum';
import { Severity } from 'src/app/enum/severity.enum';
import { EditCategoryEvent } from 'src/app/interfaces/event/category/edit-category-event-interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages/toast-messages.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: [],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  public addCategoryAction = CategoryEvent.ADD_CATEGORY_EVENT;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_EVENT;

  public categoryAction!: { event: EditCategoryEvent };

  public categoryForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private toastMessageService: ToastMessagesService,
    private categoryService: CategoriesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryAction = this.config.data;
  }

  handleSubmitAddCategory() {
    if (this.categoryForm?.value && this.categoryForm?.valid) {
      const requestCreateCategory = {
        name: this.categoryForm?.value.name as string,
      };

      this.categoryService
        .createCategory(requestCreateCategory)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => {
            if (response) {
              this.toastMessageService.show(
                Severity.SUCCESS,
                'Operação concluída',
                'Categoria criada com sucesso.'
              );
              this.ref.close(true);
            }
            this.categoryForm.reset();
          },
          error: error => {
            console.error(error);
            this.toastMessageService.show(
              Severity.ERROR,
              'Falha na operação',
              'Houve um erro ao criar a categoria.'
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
