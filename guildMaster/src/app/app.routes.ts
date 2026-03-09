import { Routes } from '@angular/router';
import { HomePage } from './pages/homepage/home.pages';
import { NotFound } from './pages/notFound/not-found.pages';
import { RegisterUser } from './pages/forms/auth/register/register-user.pages';

export const routes: Routes = [
    {
        path:'register',
        component:RegisterUser,
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
