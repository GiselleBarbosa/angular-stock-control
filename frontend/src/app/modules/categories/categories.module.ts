import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesHomeComponent } from './pages/categories-home/categories-home.component';
import { CATEGORIES_ROUTES } from './categories.routing';
import { RouterModule } from '@angular/router';
import { SharedModuleGlobal } from 'src/app/shared/shared.module';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

@NgModule({
  declarations: [CategoriesHomeComponent, CategoriesTableComponent, CategoryFormComponent],
  imports: [CommonModule, RouterModule.forChild(CATEGORIES_ROUTES), SharedModuleGlobal],
})
export class CategoriesModule {}
