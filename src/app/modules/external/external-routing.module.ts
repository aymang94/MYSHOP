import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalComponent } from './external.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ROUTES } from '../../shared/constances/routes.const';

const routes: Routes = [
  {
    path: '',
    component: ExternalComponent,
    children: [
      { path: '', redirectTo: ROUTES.LOGIN, pathMatch: 'full' },
      {
        path: ROUTES.LOGIN,
        component: LoginComponent
      },
      {
        path: ROUTES.SIGNUP,
        component: SignupComponent
      },
      {
        path: ROUTES.RESET_PASSWORD,
        component: ResetPasswordComponent
      }
    ]
  }]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalRoutingModule { }
