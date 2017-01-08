import { Injectable } from '@angular/core';
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable()
export class PresentService {

  PRESENTS_URL = `${environment.API_URL}/presents`;

  constructor(private http:Http) { }

  getOptions(){
    //const userToken = localStorage.getItem('id_token');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    //headers.append('Authorization', 'Bearer ' + userToken);
    const options = new RequestOptions({ headers: headers });
    return options;
  }

  getPresents(){
      return [
        {
          "id": "uid1",
          "label": "super nintendo",
          "childId": "adrien",
          "url": "http://www.priceminister.com/mfp/212978/super-nintendo-super-nes-console?pid=126313554",
          "santaName": "Adrien",
          "pics": "http://www.pngfactory.net/_png/_thumb/5182-tOo-SNES.png"
        },
        {
          "id": "uid2",
          "label": "ps4",
          "childId": "adrien",
          "url": "",
          "santaName": "",
          "pics": "Adrien"
        },
        {
          "id": "uid3",
          "label": "lego",
          "childId": "yaelle",
          "url": "",
          "santaName": "",
          "pics": ""
        },
        {
          "id": "uid4",
          "label": "bon d'achat H&M",
          "childId": "melanie",
          "url": "",
          "santaName": "",
          "pics": ""
        },
        {
          "id": "uid5",
          "label": "doudou",
          "childId": "eline",
          "url": "",
          "santaName": "",
          "pics": ""
        }
      ]
  }

  getPresentByChild(childId: string){
    return this.http.get(`${this.PRESENTS_URL}/${childId}`)
      .map((res: Response) => {
        return res.status === 200 ? res.json() : {};
      })
      .catch((error: any) => {
        return Observable.throw(error);
      })
  }

}
