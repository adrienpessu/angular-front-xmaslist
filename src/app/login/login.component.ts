import { MatSnackBarModule } from '@angular/material/snack-bar';
import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from './login.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Profile} from './shared/profile.model';
import {MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {State} from './login.reducer';
import * as action from './login.action';
import {JwtHelper} from 'angular2-jwt';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    state: any;

    password: string;

    profile: string;

    user = 'invite';

    @ViewChild('passwordField') passwordField;

    constructor(private store: Store<State>, private loginService: LoginService, private router: Router
        , private route: ActivatedRoute, public snackBar: MatSnackBar) {
        this.store.select('login').subscribe(s => {
            this.state = s;
        });
    }

    login() {
        if (!this.user) {
            this.user = 'invite';
        }
        this.store.dispatch(new action.LoginAction());
        this.loginService.giveProfile(this.user, this.password).subscribe(result => {
                if (result) {
                    this.store.dispatch(new action.LoginSuccessAction());
                    const jwtHelper: JwtHelper = new JwtHelper();
                    let token = result.substring(6);
                    localStorage.setItem('id_token', token);
                    localStorage.setItem('profile', jwtHelper.decodeToken(result).sub);
                    this.redirectToList();
                } else {
                    this.store.dispatch(new action.LoginFailAction());
                    this.snackBar.open('Mot de passe incorrect', 'Fermer', {
                        duration: 10000,
                    }).onAction().subscribe(() => {
                        this.password = '';
                        this.passwordField.nativeElement.focus();
                    });
                }
            }
            ,
            error => {
                this.store.dispatch(new action.LoginFailAction());
                this.snackBar.open('Mot de passe incorrect ou problème technique', 'Fermer', {
                    duration: 2000,
                }).onAction().subscribe(() => {
                    this.password = '';
                    this.passwordField.nativeElement.focus();
                });
            });
    }

    onEnterKey(event) {
        if (event.which === 13) {
            this.login();
            event.preventDefault();
        }
    };

    IamFocus() {
        return true;
    }

    redirectToList() {
        this.router.navigate(['/list']);
    }

    ngOnInit() {
        if (localStorage.getItem('profile')) {
            const profile: Profile = JSON.parse(localStorage.getItem('profile'));
            this.router.navigate(['/list']);
        }
        this.route.params
            .subscribe((params: Params) => {
                this.user = params['user'];
            });
    }

}
