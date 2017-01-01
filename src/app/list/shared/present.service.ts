import { Injectable } from '@angular/core';

@Injectable()
export class PresentService {

  constructor() { }

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

  getPresentByChild(id: string) : any[]{
    let presentForChild: any[] = [];
    for(let present of this.getPresents()){
      if(present.childId == id){
        presentForChild.push(present);
      }
    }
    return presentForChild;
  }

}
