import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'update-password',
    loadComponent: () => import('./components/update-password/update-password.component').then(m => m.UpdatePasswordComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./components/create-ticket/create-ticket.component').then(m => m.CreateTicketComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/create-ticket/create-ticket.component').then(m => m.CreateTicketComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('./components/search/search.component').then(m => m.SearchComponent)
  }
];