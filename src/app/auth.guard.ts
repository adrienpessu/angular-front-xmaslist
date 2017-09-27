import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import {JwtHelper} from 'angular2-jwt';
import {Profile} from 'app/login/shared/profile.model';
import {environment} from '../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {

  profile: Profile;

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    console.log(window.location.hostname);
    const jwtHelper: JwtHelper = new JwtHelper();
    if (!!localStorage.getItem('id_token')) {
      const expirationDate = jwtHelper.getTokenExpirationDate(localStorage.getItem('id_token'));
      if (expirationDate < new Date()) {
        localStorage.clear();
        this.redirectToLogin();
        return false;
      }
      if (localStorage.getItem('profile') !== null) {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        if (this.profile != null && (this.profile.name === 'invite'
          || this.profile.name === 'admin')) {
          return true;
        }
      }
    }
    this.redirectToLogin();

    return false;
  }

  redirectToLogin() {
    if (window.location.hostname === environment.ADMIN_URL) {
      this.router.navigate(['login', 'admin']);
    } else {
      this.router.navigate(['login']);
    }
  }

}
