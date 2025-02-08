import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ROUTES } from '../../shared/constances/routes.const';
import { AlertService } from '../../shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrl: './internal.component.scss'
})
export class InternalComponent {

  authService = inject(AuthService);
  alertService = inject(AlertService);
  router = inject(Router);
  ROUTES = ROUTES;

  logout() {
    this.alertService.alertConfirm('','You want to logout!').then(res=> {
      if(res.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
