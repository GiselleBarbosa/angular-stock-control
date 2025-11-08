import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Severity } from 'src/app/enum/severity.enum';
import { ToastMessagesService } from 'src/app/services/toast-messages/toast-messages.service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  standalone: false
})
export class ToolbarNavigationComponent {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toastMessage: ToastMessagesService
  ) { }

  isLoggedIn = this.cookieService.check('USER_INFO');

  signOut() {
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


}
