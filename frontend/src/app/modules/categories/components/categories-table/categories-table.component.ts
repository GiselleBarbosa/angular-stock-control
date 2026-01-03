import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryEvent } from 'src/app/enum/categoryEvent.enum';
import { Categories } from 'src/app/interfaces/category/categories-interface';
import { DeleteCategoryEvent } from 'src/app/interfaces/event/category/delete-category-event-interface';
import { EditCategoryEvent } from 'src/app/interfaces/event/category/edit-category-event-interface';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: [],
})
export class CategoriesTableComponent {
  @Input() public categories!: Categories.CategoriesResponse[];
  @Output() public categoryEvent = new EventEmitter<EditCategoryEvent>();
  @Output() public deleteCategoryEvent = new EventEmitter<DeleteCategoryEvent>();

  public categoriaSelecionada!: Categories.CategoriesResponse;
  public categorySelected!: Categories.CategoriesResponse;

  public addCategoryAction = CategoryEvent.ADD_CATEGORY_EVENT;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_EVENT;

  handleDeleteCategoryEvent(category_id: string, categoryName: string): void {
    if (category_id !== '' && categoryName !== '') {
      this.deleteCategoryEvent.emit({ category_id, categoryName });
    }
  }

  handleCategoryEvent(action: string, id?: string, categoryName?: string): void {
    console.log('Clicou ', action);
    if (action && action !== '') {
      this.categoryEvent.emit({ action, id, categoryName });
    }
  }
}
