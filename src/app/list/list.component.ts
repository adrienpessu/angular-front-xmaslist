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

  dialogCreationRef: MdDialogRef<CreationDialog>;

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

  openCreationDialog() {
    this.dialogCreationRef = this.dialog.open(CreationDialog, {
      disableClose: false
    });

    this.dialogCreationRef.afterClosed().subscribe(result => {
      if(result && result.answer){
        let newPresent: Present = {
          id: '',
          label:result.label,
          childId: this.childId,
          url:result.link,
          pics: result.pics,
          santaName:''
        };
        this.presentService.createPresent(newPresent).subscribe((p: Present) => {
          this.presents.push(p);
        });
      }
      this.dialogCreationRef = null;
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

  remove(id:string) {
    this.presentService.removePresent(id).subscribe(
      result => {
        const newList:Present[] = [];
        for(let p of this.presents){
          if(p.id != id){
            newList.push(p);
          }
        }
        this.presents = newList;
      },
      error => {
        Observable.throw(error)
      }
    );
  }

  disconnect(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  ngOnInit() {
    if(localStorage.getItem('profile') !== null){

      this.profile = JSON.parse(localStorage.getItem('profile'));

      if(this.profile != null && (this.profile.name == 'invite'
        || this.profile.name == 'admin')){
        console.log('logged');
      }
      else{
        this.router.navigate(['']);
      }
    }
    else{
      this.router.navigate(['']);
    }
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => {
        let childId = e.url.replace(/\/list\//g, '');
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
    <md-card><h1 md-line md-dialog-title>Êtes-vous sûr de reserver ce présent?</h1></md-card><br/>
    <md-card>
      <p md-line>Après votre confirmation, ce présent ne sera plus selectionnable par une autre personne.
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

@Component({
  selector: 'creation-dialog',
  template: `    
    <md-card><h1 md-line md-dialog-title>Ajouter un présent</h1></md-card><br/>
    <md-card>
      <p md-line>Nom du cadeau (Obligatoire) :</p>
      <input required mdInput #labelInput size="50">      
      <p md-line>Lien web où acheter ou trouver des informations (facultatif) :</p>
      <input md-input #linkInput size="50">      
      <p md-line>Lien vers une image (facultatif) :</p>
      <input md-input #picsInput size="50">
    </md-card>
    <md-dialog-actions>
      <button md-raised-button (click)="(labelInput.value?dialogRef.close({'answer':true, 'label': labelInput.value, 'link': linkInput.value, 'pics': picsInput.value}):'')">
        Créer
      </button>
      <button md-raised-button md-dialog-close>Annuler</button>
    </md-dialog-actions>
  `
})
export class CreationDialog {
  constructor(public dialogRef: MdDialogRef<CreationDialog>) { }
}
