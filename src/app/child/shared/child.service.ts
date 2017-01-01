import { Injectable } from '@angular/core';

@Injectable()
export class ChildService {

  constructor() { }

  getChildren(){
      return [
        {
          'id': 'adrien',
          'name': 'Adrien'
        },
        {
          'id': 'melanie',
          'name': 'Mélanie'
        },
        {
          'id': 'yaelle',
          'name': 'Yaëlle'
        },
        {
          'id': 'eline',
          'name': 'Éline'
        },

      ]
  }

  getChildrenAsMap(){
    const map: { [key:string]:string; } = {};
    for(let child of this.getChildren()){
      map[child.id] = child.name;
    }
    return map;
  }

}
