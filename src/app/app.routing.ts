import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component'
import {LoginComponent} from "./login/login.component";

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  { path: 'list/:name', component: ListComponent },
  { path: 'list', component: ListComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
