import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../constances/routes.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  router = inject(Router);

  login() {
    this.router.navigate([ROUTES.INTERNAL]);
    localStorage.setItem('loggedIn', "true");
  }

  logout() {
    this.router.navigate([ROUTES.EXTERNAL]);
    localStorage.removeItem('loggedIn');
  }

}
