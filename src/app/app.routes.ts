import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { authGuard } from './login/auth.guard';
import { loggedGuard } from './login/logged.guard';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent,canActivate:[loggedGuard]},
    {path:'home',component:HomeComponent,canActivate:[authGuard]},
    {path:"list",component:ListComponent,canActivate:[authGuard]}
];
