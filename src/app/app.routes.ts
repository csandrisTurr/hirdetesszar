import { Routes } from '@angular/router';
import { RegisterComponent } from './routes/register/register.component';
import { LoginComponent } from './routes/login/login.component';

export const routes: Routes = [
    { component: RegisterComponent, path: 'register', title: 'Register', },
    { component: LoginComponent, path: 'login', title: 'Login' },
];
