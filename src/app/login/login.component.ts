import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {Router} from "@angular/router";

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
    this.profile = this.loginService.giveProfile('default', this.password);
    console.log(this.profile);
    if(this.profile != ''){
      localStorage.setItem('profile', this.profile);
      this.redirectToList();
    }
  }

  redirectToList(){
    this.router.navigate(['/list']);
  }

  ngOnInit() {
    if(localStorage.getItem('profile') == 'admin'
      || localStorage.getItem('profile') == 'guest'){
      this.router.navigate(['/list']);
    }
  }

}
