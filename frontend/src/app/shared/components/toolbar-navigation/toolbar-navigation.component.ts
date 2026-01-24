import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Severity } from 'src/app/enum/severity.enum';
import { ToastMessagesService } from '../../services/toast-messages/toast-messages.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductFormComponent } from 'src/app/modules/products/components/product-form/product-form.component';
import { ProductEvent } from 'src/app/enum/productEvent.enum';
import { every } from 'rxjs';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  standalone: false,
})
export class ToolbarNavigationComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toastMessage: ToastMessagesService,
    private dialogService: DialogService
  ) {}

  isLoggedIn = this.cookieService.check('USER_INFO');

  handleLogout(): void {
    if (this.isLoggedIn) {
      this.cookieService.delete('USER_INFO');
      this.router.navigate(['/home']);
      this.toastMessage.show(
        Severity.SUCCESS,
        'Até logo! 👋',
        'Você saiu do sistema com segurança. Volte sempre!',
        3000
      );
    }
  }

  handleSaleProduct(): void {
    const saleProductEvent = ProductEvent.SALE_PRODUCT_EVENT;

    this.dialogService.open(ProductFormComponent, {
      header: saleProductEvent,
      width: '70%',
      contentStyle: {
        overflow: 'auto',
      },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: { action: saleProductEvent },
      },
    });
  }
}
