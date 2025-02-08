import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../../../shared/constances/routes.const';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  router = inject(Router);
  ROUTES = ROUTES;
  
  navTo(page: string) {
    this.router.navigate([ROUTES.INTERNAL+ '/' + page]);
  }
}
