import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { Severity } from 'src/app/enum/severity.enum';
import { User } from 'src/app/interfaces/user/user-interface';
import { UserService } from 'src/app/services/user/user.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages/toast-messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, AfterViewInit {
  @ViewChild('emailInput') public emailInputRef!: ElementRef;
  @ViewChild('passwordInput') public passwordInputRef!: ElementRef;

  private destroy$ = new Subject<void>();
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
  ) {}

  ngAfterViewInit(): void {
    this.emailInputRef.nativeElement.value = 'Informe seu email'
    this.passwordInputRef.nativeElement.value = 'Informe sua senha';
    console.log("Email Input: ", this.emailInputRef.nativeElement.value);
    console.log('Password Input: ', this.passwordInputRef.nativeElement.value);
  }

  login() {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as User.UserRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => {
            if (response) {
              this.cookieService.set('USER_INFO', response?.token);
              this.toastMessage.show(
                Severity.SUCCESS,
                '✨ Bem-vindo(a) de volta!',
                `Que bom ter você aqui novamente, ${response.name}!`
              );
              this.loginForm.reset();
              this.router.navigate(['/dashboard']);
            }
          },
          error: () => {
            this.toastMessage.show(
              Severity.ERROR,
              'Não foi possível entrar',
              'Verifique seu e-mail e senha e tente novamente.'
            );
          },
        });
    }
  }

  register() {
    if (this.registerUserForm.value && this.registerUserForm.valid) {
      this.userService
        .signupUser(this.registerUserForm.value as User.UserRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: response => {
            if (response) {
              this.toastMessage.show(
                Severity.SUCCESS,
                'Conta criada com sucesso! 🎉',
                'Você já pode fazer login para acessar o sistema'
              );
              this.registerUserForm.reset();
              this.loginCard = true;
            }
          },
          error: () => {
            this.toastMessage.show(
              Severity.ERROR,
              'Não foi possível criar sua conta',
              'Este e-mail já pode estar em uso. Tente usar outro e-mail ou faça login se já possui uma conta.'
            );
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
