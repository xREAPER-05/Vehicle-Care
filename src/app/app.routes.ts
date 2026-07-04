import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then((m) => m.AuthPage)
  },
    {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage),
  },
];