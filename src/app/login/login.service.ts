import { Injectable } from '@angular/core';
import {Response, Http, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {

  LOGIN_URL = `${environment.API_AUTH_URL}`;

  constructor(private http: Http) { }

  getOptions() {
    // const userToken = localStorage.getItem('id_token');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization', 'Bearer ' + userToken);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  giveProfile(login: string, password: string) {
    return this.http.post(`${this.LOGIN_URL}/login`, {'username': login, 'password': password}, this.getOptions())
      .map((res: Response) => {
        if (res.status !== 200) {
          return Observable.throw('' + res.status);
        }
        return res.headers.get('authorization');
      })
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

}
