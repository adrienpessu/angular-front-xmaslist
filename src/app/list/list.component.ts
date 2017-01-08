import {Component, OnInit, Optional} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {ChildService} from "../child/shared/child.service";
import {PresentService} from "./shared/present.service";
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {Observable} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ChildService, PresentService]

})
export class ListComponent implements OnInit {

  presents: any[];

  child: string = 'adrien';

  dialogRef: MdDialogRef<PizzaDialog>;

  constructor(private router: Router, private childService: ChildService
    , private presentService: PresentService, public dialog: MdDialog) { }

  openDialog(uid: string) {

    this.dialogRef = this.dialog.open(PizzaDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if(result && result.answer){
        for(let present of this.presents){
          if(present.id == uid){
            present.santaName = (result.santaName?result.santaName:'Père noël');
          }
        }
      }
      this.dialogRef = null;
    });
    return false;
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((e) => {
        let childId = e.url.replace(/\/list\//g, '');
        if(childId == '/'){
          this.child = this.childService.getChildren()[0].name;
          childId = this.childService.getChildren()[0].id;
        }
        else {
          this.child = this.childService.getChildrenAsMap()[childId];
        }

        this.presentService.getPresentByChild(childId).subscribe(
          presents => {
            this.presents = presents;
          },
          error => {
            Observable.throw(error)
          }
        );

      });



  }




}

@Component({
  selector: 'pizza-dialog',
  template: `
  
  <md-card><h1 md-line md-dialog-title>Êtes-vous sûr de mettre ce présent dans votre hôte?</h1></md-card><br/>
  <md-card>
    <p md-line>Après votre confirmation, ce présent ne sera plus selectionnable par un autre père Noël.
    <br/>Si vous le souhaitez, vous pouvez mettre votre nom.</p>
    <input md-input #dialogInput>
  </md-card>
  <md-dialog-actions>
    <button md-raised-button (click)="dialogRef.close({'answer':true, 'santaName': dialogInput.value})">Oui, je confirme</button>
    <button md-raised-button md-dialog-close>Non, je ne suis pas sûr</button>
  </md-dialog-actions>
  `
})
export class PizzaDialog {
  constructor(public dialogRef: MdDialogRef<PizzaDialog>) { }
}
