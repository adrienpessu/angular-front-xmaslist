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
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {AuthService} from './auth.service';
import {CheckdialogComponent} from './list/checkdialog/checkdialog.component';
import {CreationdialogComponent} from './list/creationdialog/creationdialog.component';
import {StoreModule} from '@ngrx/store';
import {reducer} from './app.reducer';
import {routerReducer} from '@ngrx/router-store';

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
        StoreModule.forRoot({ reducer }),
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        MatSelectModule
    ],
    entryComponents: [CheckdialogComponent, CreationdialogComponent],
    providers: [AuthGuard, AuthService/*, MdIconRegistry*/],
    bootstrap: [AppComponent]
})
export class AppModule {
}
