import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModuleGlobal } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages/toast-messages.service';
import { HomeComponent } from './pages/home/home.component';
import { HOME_ROUTES } from './home.routing';

@NgModule({
  imports: [SharedModuleGlobal, CommonModule, RouterModule.forChild(HOME_ROUTES)],
  declarations: [HomeComponent],
  providers: [ToastMessagesService],
})
export class HomedModule {}
