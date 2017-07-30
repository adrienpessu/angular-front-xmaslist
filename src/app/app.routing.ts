import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {ListComponent} from './list/list.component';

const appRoutes: Routes = [
  {path: '', component: ListComponent, canActivate: [AuthGuard]},
  {path: 'login/:user', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  { path: 'list/:name', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
