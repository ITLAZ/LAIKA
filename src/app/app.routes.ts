import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'about-us',
    pathMatch: 'full',
  },
  {
    path: 'about-us',
    loadComponent: () => import('./pages/about-us/about-us').then((m) => m.AboutUs),
  },
  {
    path: 'adopt',
    loadComponent: () => import('./pages/adopt/adopt').then((m) => m.Adopt),
  },
  {
    path: 'donations',
    loadComponent: () => import('./pages/donations/donations').then((m) => m.Donations),
  },
  {
    path: 'volunteer',
    loadComponent: () => import('./pages/volunteer/volunteer').then((m) => m.Volunteer),
  },
  // specific wildcard route to catch 404s can be added here
  {
    path: '**',
    redirectTo: 'about-us'
  }
];