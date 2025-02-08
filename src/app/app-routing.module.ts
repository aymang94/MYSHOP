import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './shared/constances/routes.const';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.EXTERNAL,
    pathMatch: 'full'
  },
  { path: ROUTES.EXTERNAL, loadChildren: () => import('./modules/external/external.module').then(m => m.ExternalModule) },
  { path: ROUTES.INTERNAL, loadChildren: () => import('./modules/internal/internal.module').then(m => m.InternalModule) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
