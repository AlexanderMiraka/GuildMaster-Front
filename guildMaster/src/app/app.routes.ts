import { Routes } from '@angular/router';
import { HomePage } from './pages/homepage/home.pages';
import { NotFound } from './pages/notFound/not-found.pages';
import { UserAuth } from './pages/auth/auth.pages';

export const routes: Routes = [
    {
        path:'auth',
        component:UserAuth,
    },
    {
        path:'',
        component:HomePage
    },
    {
        path:'**',
        component:NotFound
    },
];
