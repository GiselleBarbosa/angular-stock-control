import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/interfaces/user-interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
    private cookieService: CookieService
  ) { }

  login() {
    console.log("Chamou login");

    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as User.UserRequest).subscribe({
        next: response => {
          console.log("Response", response.email);
          if (response) {
            console.log("email", response.email);
            this.cookieService.set("USER_INFO", response?.token);
            alert("Login realizado com sucesso!");
            this.loginForm.reset();
          }
        },
        error: (e) => {
          console.error("Houve um erro ao fazer o login.", e);
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
                alert("Usuário cadastrado com sucesso!");
                this.registerUserForm.reset();
                this.loginCard = true;
              }
            },
            error: (e) => {
              console.error("Houve um erro ao tentar cadastrar usuário.", e);
            }
          }
        );
    }
    console.log('Cadastro Dados: ', this.registerUserForm.value);
  }
}
