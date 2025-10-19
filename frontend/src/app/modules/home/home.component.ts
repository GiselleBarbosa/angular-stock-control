import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user-interface';
import { UserService } from 'src/app/services/user/user.service';
import { Severity } from 'src/app/enum/severity.enum';

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
    private messageService: MessageService,
    private router : Router
  ) { }

  show(severity: Severity, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary, detail, life: 2000 });
  }

  login() {
    console.log("Esta logado? ", this.userService.isLoggedIn()  );

    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as User.UserRequest).subscribe({
        next: response => {
          if (response) {
            this.cookieService.set("USER_INFO", response?.token);
            this.show(Severity.SUCCESS, "Sucesso", `Bem-vindo(a) de volta, ${response.name}!`);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
          }
        },
        error: () => {
          this.show(Severity.ERROR, "Login", "Houve um erro ao fazer o login.");
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
                this.show(Severity.SUCCESS, "Cadastro", "Usuário criado com sucesso!");
                this.registerUserForm.reset();
                this.loginCard = true;
              }
            },
            error: () => {
              this.show(Severity.ERROR, "Cadastro", "Houve um erro ao tentar cadastrar usuário.");
            }
          }
        );
    }
    console.log('Cadastro Dados: ', this.registerUserForm.value);
  }
}
