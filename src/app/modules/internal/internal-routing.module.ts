import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternalComponent } from './internal.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ROUTES } from '../../shared/constances/routes.const';

const routes: Routes = [
  {
    path: '',
    component: InternalComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: ROUTES.HOME, pathMatch: 'full' },
      { path: ROUTES.HOME, component: HomeComponent },
      { path: ROUTES.PRODUCTS, loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
      { path: ROUTES.INVOICES, loadChildren: () => import('./modules/invoices/invoices.module').then(m => m.InvoicesModule) }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalRoutingModule { }
