import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);

  let isLoggedIn = JSON.parse(localStorage.getItem("loggedIn")|| 'false');
  if (isLoggedIn) return true;
  
  router.navigate(['external']);
  return false;
};
