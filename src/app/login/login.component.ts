import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
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

  constructor(private loginService: LoginService, private router: Router) { }

  login(){
    this.loginService.giveProfile('invite', this.password).subscribe(result => {
      console.log(result);
      if(result && result.name && result.token){
        localStorage.setItem('profile', JSON.stringify(result));
        localStorage.setItem('id_token', result.token);
        this.redirectToList();
      }
    });
  }

  redirectToList(){
    this.router.navigate(['/list']);
  }

  ngOnInit() {
    if(localStorage.getItem('profile')){
      const profile: Profile = JSON.parse(localStorage.getItem('profile'));
      this.router.navigate(['/list']);
    }
  }

}
