import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required],
  });

  signupForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    senha: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmitLogin() {
    console.log('Login Dados: ', this.loginForm.value);
  }

  onSubmitSignup() {
    console.log('Cadastro Dados: ', this.signupForm.value);
  }
}
