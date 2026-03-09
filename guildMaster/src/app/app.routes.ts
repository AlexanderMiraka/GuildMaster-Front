import { Routes } from '@angular/router';
import { HomePage } from './pages/homepage/home.pages';
import { NotFound } from './pages/notFound/not-found.pages';

export const routes: Routes = [
    {
        path:'',
        component:HomePage
    },
    {
        path:'**',
        component:NotFound
    },
];
