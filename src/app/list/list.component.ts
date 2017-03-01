import {Component, OnInit, Optional} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {ChildService} from "../child/shared/child.service";
import {PresentService} from "./shared/present.service";
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {Observable} from "rxjs";
import {Present} from "./shared/present.model";
import {Profile} from "../login/shared/profile.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ChildService, PresentService]

})
export class ListComponent implements OnInit {

  presents: Present[];

  child: string = 'adrien';

  childId: string = 'adrien';

  profile: Profile;

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
            this.presentService.checkPresent(present).subscribe((e) => {
              this.refreshPresents();
            });
          }
        }
      }
      this.dialogRef = null;
    });
    return false;
  }

  refreshPresents(){
    this.presentService.getPresentByChild(this.childId).subscribe(
      presents => {
        this.presents = presents;
      },
      error => {
        Observable.throw(error)
      }
    );
  }

  ngOnInit() {
    if(!!!localStorage.getItem('profile')){
      this.profile = JSON.parse(localStorage.getItem('profile'));
      if(this.profile.name == 'invite'
        || this.profile.name == 'admin'){
        console.log('logged');
      }
      else{
        this.router.navigate(['']);
      }
    }
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((e) => {
        let childId = e.url.replace(/\/list\//g, '');
        console.log(e.url);
        if(childId == '/' || childId == '/list'){
          this.child = this.childService.getChildren()[0].name;
          childId = this.childService.getChildren()[0].id;
        }
        else {
          this.child = this.childService.getChildrenAsMap()[childId];
        }

        this.childId = childId;

        this.refreshPresents();

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
