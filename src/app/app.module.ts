import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {routing} from './app.routing';

import { AppComponent } from './app.component';
import {HeaderComponent} from "./header/header.component";
import {LoginComponent} from "./login/login.component";
import {CreationDialog, ListComponent, PizzaDialog} from "./list/list.component";
import {MenuComponent} from "./child/menu/menu.component";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./auth.guard";
import {
  MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdCommonModule, MdCoreModule, MdDialogModule,
  MdIconModule, MdIconRegistry,
  MdInputModule, MdLineModule,
  MdListModule, MdProgressBarModule,
  MdSidenavModule, MdSliderModule, MdSnackBar, MdSnackBarModule,
  MdToolbarModule
} from "@angular/material";
import {AuthService} from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ListComponent,
    MenuComponent,
    PizzaDialog,
    CreationDialog
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    routing,
    MdLineModule,
    MdIconModule,
    MdButtonToggleModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdDialogModule,
    MdToolbarModule,
    MdListModule,
    MdSidenavModule,
    MdCardModule,
    MdCommonModule,
    MdCoreModule,
    MdButtonToggleModule,
    MdSliderModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdProgressBarModule
  ],
  exports: [MdIconModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdDialogModule,
    MdToolbarModule,
    MdListModule,
    MdSidenavModule,
    MdCardModule,
    MdCommonModule,
    MdCoreModule,
    MdButtonToggleModule,
    MdSliderModule,
    MdSidenavModule,
    MdProgressBarModule],
  entryComponents: [PizzaDialog, CreationDialog],
  providers: [AuthGuard, AuthService, MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule { }
