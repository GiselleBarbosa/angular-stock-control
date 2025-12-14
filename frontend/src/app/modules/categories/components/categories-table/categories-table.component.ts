import { Component, Input } from '@angular/core';
import { Categories } from 'src/app/interfaces/categories-interface';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss'],
})
export class CategoriesTableComponent {
  @Input() public categories!: Categories.CategoriesResponse[];
  
  public categoriaSelecionada!: Categories.CategoriesResponse;
}
