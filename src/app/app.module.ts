import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {routing} from './app.routing';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {ListComponent} from './list/list.component';
import {MenuComponent} from './child/menu/menu.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuard} from './auth.guard';
import {
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdCommonModule,
    MdCoreModule,
    MdDialogModule,
    MdIconModule,
    MdIconRegistry,
    MdInputModule,
    MdLineModule,
    MdListModule,
    MdProgressBarModule,
    MdSidenavModule,
    MdSliderModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdSelectModule
} from '@angular/material';
import {AuthService} from './auth.service';
import {CheckdialogComponent} from './list/checkdialog/checkdialog.component';
import {CreationdialogComponent} from './list/creationdialog/creationdialog.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './app.reducer';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        ListComponent,
        MenuComponent,
        CheckdialogComponent,
        CreationdialogComponent,
        CheckdialogComponent,
        CreationdialogComponent
    ],
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        BrowserModule,
        routing,
        StoreModule.provideStore(reducer),
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
        MdProgressBarModule,
        MdSelectModule
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
    entryComponents: [CheckdialogComponent, CreationdialogComponent],
    providers: [AuthGuard, AuthService, MdIconRegistry],
    bootstrap: [AppComponent]
})
export class AppModule {
}
