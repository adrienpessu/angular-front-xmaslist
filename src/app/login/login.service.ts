import { Injectable } from '@angular/core';
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class LoginService {

  PRESENTS_URL = `${environment.API_URL}/login`;

  constructor(private http:Http) { }

  getOptions(){
    //const userToken = localStorage.getItem('id_token');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    //headers.append('Authorization', 'Bearer ' + userToken);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  giveProfile(event:string, password:string){
    switch(password){
      case 'guest':
        return 'guest';
      case 'admin':
        return 'admin';
    }
  }

}
