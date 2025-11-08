import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Severity } from 'src/app/enum/severity.enum';
import { User } from 'src/app/interfaces/user-interface';
import { ToastMessagesService } from 'src/app/services/toast-messages.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false

})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  registerUserForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private toastMessage: ToastMessagesService
  ) { }


  login() {

    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as User.UserRequest).subscribe({
        next: response => {
          if (response) {
            this.cookieService.set("USER_INFO", response?.token);
            this.toastMessage.show(
              Severity.SUCCESS,
              "✨ Bem-vindo(a) de volta!",
              `Que bom ter você aqui novamente, ${response.name}!`
            );
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
          }
        },
        error: () => {
          this.toastMessage.show(
            Severity.ERROR,
            "Não foi possível entrar",
            "Verifique seu e-mail e senha e tente novamente."
          );
        }
      });
    }

  }

  register() {
    if (this.registerUserForm.value && this.registerUserForm.valid) {
      this.userService.signupUser(this.registerUserForm.value as User.UserRequest)
        .subscribe(
          {
            next: (response) => {
              if (response) {
                this.toastMessage.show(
                  Severity.SUCCESS,
                  "Conta criada com sucesso! 🎉",
                  "Você já pode fazer login para acessar o sistema"
                );
                this.registerUserForm.reset();
                this.loginCard = true;
              }
            },
            error: () => {
              this.toastMessage.show(
                Severity.ERROR,
                "Não foi possível criar sua conta",
                "Este e-mail já pode estar em uso. Tente usar outro e-mail ou faça login se já possui uma conta."
              );
            }
          }
        );
    }
    console.log('Cadastro Dados: ', this.registerUserForm.value);
  }
}
