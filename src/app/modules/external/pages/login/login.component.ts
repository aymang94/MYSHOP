import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  MOCK_USER =  {
    USERNAME: 'aymanGamal',
    PASSWORD: 'aymanGamal'
  };

  loginForm = new FormGroup({
    username: new FormControl(this.MOCK_USER.USERNAME, {validators: Validators.required}),
    password: new FormControl(this.MOCK_USER.PASSWORD, {validators: Validators.required})
  }
  );

  router = inject(Router);
  authService = inject(AuthService);
  alertService = inject(AlertService);

  ngOnInit(): void {
    
  }
  
  
  isValidUser() {           /// Simulate BE login API ///
    if(this.loginForm.controls.username.value === this.MOCK_USER.USERNAME &&
      this.loginForm.controls.password.value === this.MOCK_USER.PASSWORD
    ) {
      return true
    }
    return false;
  }
  

  login() {
    if(this.isValidUser()) {
      this.authService.login();
      return;
    }
    this.alertService.alertError('Invalid Username or Password !');
  }
}
