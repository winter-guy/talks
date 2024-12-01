import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: '',
        loadChildren: async () => (await import('@pages/home/home.routes')).routes,
    }
];