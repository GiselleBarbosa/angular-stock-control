import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModuleGlobal } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { HOME_ROUTES } from './home.routing';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [SharedModuleGlobal, CommonModule, RouterModule.forChild(HOME_ROUTES)],
  declarations: [HomeComponent],
})
export class HomeModule {}
