import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {Response, Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class ChildService {

  CHILDS_URL = `${environment.API_ACCOUNT_URL}/adrien.json`;

  constructor(private http: Http) { }

  getChildren() {
    return this.http.get(`${this.CHILDS_URL}`)
      .map((res: Response) => {
        return res.status === 200 ? res.json() : {};
      })
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

}
