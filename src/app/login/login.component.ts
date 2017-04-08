import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Profile} from "./shared/profile.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  password:string;

  profile: string;

  user: string = 'invite';

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute) { }

  login(){
    this.loginService.giveProfile(this.user, this.password).subscribe(result => {
      if(result && result.name && result.token){
        localStorage.setItem('profile', JSON.stringify(result));
        localStorage.setItem('id_token', result.token);
        this.redirectToList();
      }
    });
  }

  onEnterKey (event) {
      if(event.which === 13) {
        this.login()
        event.preventDefault();
      }
  };

  IamFocus(){
    return true;
  }

  redirectToList(){
    this.router.navigate(['/list']);
  }

  ngOnInit() {
    if(localStorage.getItem('profile')){
      const profile: Profile = JSON.parse(localStorage.getItem('profile'));
      this.router.navigate(['/list']);
    }
    this.route.params
      .subscribe((params: Params) => {
        this.user = params['user'];
      });
  }

}
