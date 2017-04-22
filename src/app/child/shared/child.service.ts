import { Injectable } from '@angular/core';

@Injectable()
export class ChildService {

  constructor() { }

  getChildren(){
      return [
        {
          'id': 'eline',
          'name': 'Éline'
        },
        {
          'id': 'yaelle',
          'name': 'Yaëlle'
        },
        {
          'id': 'melanie',
          'name': 'Mélanie'
        },
        {
          'id': 'adrien',
          'name': 'Adrien'
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
