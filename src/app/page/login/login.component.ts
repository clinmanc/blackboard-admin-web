import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message: string;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.setMessage();
  }

  ngOnInit() {
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
    this.message = (this.authService.isLoggedIn ? '已' : '未') + '登录';
  }

  login() {
    this.message = '登录中 ...';
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });
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
}
