import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page'),
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.page'),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
