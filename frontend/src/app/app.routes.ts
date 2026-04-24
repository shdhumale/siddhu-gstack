import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
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
    path: 'search',
    loadComponent: () => import('./components/search/search.component').then(m => m.SearchComponent)
  }
];