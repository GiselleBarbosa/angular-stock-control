import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryEvent } from 'src/app/enum/categoryEvent.enum';
import { Categories } from 'src/app/interfaces/categories-interface';
import { EditCategoryEvent } from 'src/app/interfaces/edit-category-event-interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent {
  @Input() public categories!: Categories.CategoriesResponse[];
  @Output() public deleteEvent = new EventEmitter<EditCategoryEvent>();
  public categoriaSelecionada!: Categories.CategoriesResponse;
  public categorySelected!: Categories.CategoriesResponse;
  public addCategoryAction!: CategoryEvent.ADD_CATEGORY_EVENT;
  public editCategoryAction!: CategoryEvent.EDIT_CATEGORY_EVENT;

  handleCategoryEvent(category_id: string, categoryName: string): void {}
}
