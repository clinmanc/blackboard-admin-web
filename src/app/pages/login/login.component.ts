import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../base-page';
import { MdSnackBar } from '@angular/material';
import { AuthHelper } from '../../helper/authorization-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasePage implements OnInit {
  message: string;
  loginForm: FormGroup;
  formErrors = {
    'username': '',
    'password': ''
  };
  validationMessages = {
    'username': {
      'required': 'Username is required.',
      'minlength': 'Username must be at least 4 characters long.',
      'maxlength': 'Username cannot be more than 24 characters long.',
      'forbiddenName': 'Someone named "Bob" cannot be a hero.'
    },
    'password': {
      'required': 'Password is required.'
    }
  };
  colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
    '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];
  randomColor = '#03a9f4';

  constructor(
    snackBar: MdSnackBar,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super(snackBar);
    this.setMessage();
  }

  ngOnInit() {
    this.randomColor = this.colors[parseInt(String(Math.random() * this.colors.length), 0)];
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      rememberMe: false
    });
    // this.loginFrom.valueChanges
    //   .subscribe(data => this.onValueChanged(data));
    // this.onValueChanged(); // (re)set validation messages now
  }

  setMessage() {
    this.message = (AuthHelper.isLoggedIn ? '已' : '未') + '登录';
  }

  login() {
    const formModel = this.loginForm.value;

    this.message = '登录中 ...';
    this.authService.login({
      username: formModel.username,
      password: formModel.password,
      rememberMe: formModel.rememberMe
    }).subscribe(() => {
      this.setMessage();
      if (AuthHelper.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    }, this.handleError.bind(this));
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }

    const form = this.loginForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}
