import { Routes } from '@angular/router';
import { RegisterComponent } from './routes/register/register.component';
import { LoginComponent } from './routes/login/login.component';
import { RootComponent } from './routes/root/root.component';

export const routes: Routes = [
    { component: RegisterComponent, path: 'register', title: 'Register', },
    { component: LoginComponent, path: 'login', title: 'Login' },
    { component: RootComponent, path: '', title: 'Hirderetesssesfdsd' },
];
