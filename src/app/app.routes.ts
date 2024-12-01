import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: '',
        loadChildren: async () => (await import('@component/layout/layout.routes')).routes,
    }
];
