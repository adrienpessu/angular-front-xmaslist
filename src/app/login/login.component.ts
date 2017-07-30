import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from './login.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Profile} from './shared/profile.model';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  password: string;

  profile: string;

  user = 'invite';

  showErrorMsg = false;

  @ViewChild('passwordField') passwordField;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute
    , public snackBar: MdSnackBar) { }

  login() {
    if (!this.user) {
      this.user = 'invite';
    }
    this.loginService.giveProfile(this.user, this.password).subscribe(result => {
      if (result && result.name && result.token) {
        this.showErrorMsg = false;
        localStorage.setItem('profile', JSON.stringify(result));
        localStorage.setItem('id_token', result.token);
        this.redirectToList();
      } else {
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
      this.snackBar.open('Mot de passe incorrect ou problème technique', 'Fermer', {
        duration: 2000,
      }).onAction().subscribe(() => {
        this.password = '';
        this.passwordField.nativeElement.focus();
      });
    });
  }

  onEnterKey (event) {
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
