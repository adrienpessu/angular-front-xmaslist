import { Injectable } from '@angular/core';
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Present} from "./present.model";


@Injectable()
export class PresentService {

  PRESENTS_URL = `${environment.API_URL}/presents`;

  constructor(private http:Http) { }

  getOptions(){
    const userToken = localStorage.getItem('id_token');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Bearer ' + userToken);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  createPresent(present: Present){
    return this.http.post(`${this.PRESENTS_URL}`, present, this.getOptions())
      .map((res: Response) => {
        return res.status === 201 ? res.json() : {};
      })
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

  getPresentByChild(childId: string){
    return this.http.get(`${this.PRESENTS_URL}/${childId}`, this.getOptions())
      .map((res: Response) => {
        return res.status === 200 ? res.json() : {};
      })
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

  checkPresent(present: Present){
    return this.http.put(`${this.PRESENTS_URL}`, present, this.getOptions())
      .map((res: Response) => {
        return res.status === 200 ? res.json() : {};
      })
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

  removePresent(id: string){
    return this.http.delete(`${this.PRESENTS_URL}/${id}`, this.getOptions())
      .map((res: Response) => {
        return res.status === 200 ? res : {};
      })
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

}
