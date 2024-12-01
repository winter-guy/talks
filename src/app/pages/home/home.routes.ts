import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: '',
        loadComponent: async () => (await import('@pages/home/home.component')).HomeComponent,
    }
];