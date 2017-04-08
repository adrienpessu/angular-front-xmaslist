import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import {CreationDialog, ListComponent, PizzaDialog} from './list/list.component';
import {routing} from './app.routing';
import { MenuComponent } from './child/menu/menu.component';
import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MenuComponent,
    PizzaDialog,
    CreationDialog,
    LoginComponent
  ],
  entryComponents: [PizzaDialog, CreationDialog],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
