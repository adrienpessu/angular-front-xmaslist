import { Injectable } from '@angular/core';
import {Response, Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {

  LOGIN_URL = `${environment.API_AUTH_URL}/auth`;

  constructor(private http: Http) { }

  getOptions() {
    // const userToken = localStorage.getItem('id_token');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization', 'Bearer ' + userToken);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  giveProfile(login: string, password: string) {
    return this.http.post(`${this.LOGIN_URL}/get/`, {'name': login, 'password': password}, this.getOptions())
      .map((res: Response) => {
        return res.status === 200 ? res.json() : {};
      })
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

}
