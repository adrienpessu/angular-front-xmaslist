import {Component, OnInit, Optional} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {ChildService} from "../child/shared/child.service";
import {PresentService} from "./shared/present.service";
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {Observable} from "rxjs";
import {Present} from "./shared/present.model";
import {Profile} from "../login/shared/profile.model";
import {JwtHelper} from "angular2-jwt";

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
      else{
        this.refreshPresents();
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
          url2:result.link2,
          url3:result.link3,
          pics: result.pics,
          santaName:'',
          order: 0
        };
        this.presentService.createPresent(newPresent).subscribe((p: Present) => {
          this.refreshPresents();
        });
      }
      this.dialogCreationRef = null;
    });
    return false;
  }

  uncheck(uid){
    for(let present of this.presents){
      if(present.id == uid){
        present.santaName = '';
        this.presentService.checkPresent(present).subscribe((e) => {
          this.refreshPresents();
        });
      }
    }
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

  checkPresent(present) {
    if(this.profile.name != 'admin'){
      if(!present.santaName) {
        this.openDialog(present.id)
      }
    }
    else{
      if(!present.santaName){
        this.openDialog(present.id)
      }
      else{
        this.uncheck(present.id)
      }
    }
  }

  remove(id:string) {
    this.presentService.removePresent(id).subscribe(
      result => {
        this.refreshPresents();
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
        const jwtHelper: JwtHelper = new JwtHelper();
        if(!!localStorage.getItem('id_token')) {
          const expirationDate = jwtHelper.getTokenExpirationDate(localStorage.getItem('id_token'));
          if (expirationDate < new Date()) {
            localStorage.clear();
            this.router.navigate(['']);
          }
        }
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
      <input md-input autofocus #dialogInput>
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
      <md-input-container>
        <input required mdInput size="80%" #labelInput placeholder="Nom du cadeau" value="">
      </md-input-container><br/>   
      <md-input-container>
        <input mdInput size="80%" type="url" #linkInput placeholder="Lien web " value="">
      </md-input-container><br/>
      <div [ngClass]="{'hide': (linkInput.value === '')}">
        <md-input-container>
          <input mdInput size="80%" type="url" #linkInputTwo placeholder="Lien web 2" value="">
        </md-input-container><br/>
      </div>
      <div [ngClass]="{'hide': (linkInputTwo.value === '')}">
        <md-input-container >
          <input mdInput size="80%" type="url" #linkInputThree placeholder="Lien web 3" value="">
        </md-input-container><br/>
      </div>
      <md-input-container>
        <input mdInput size="80%" type="url" #picsInput placeholder="Lien vers une image" value="">
      </md-input-container>
    </md-card>
    <md-dialog-actions>
      <button md-raised-button (click)="(labelInput.value?dialogRef.close({'answer':true, 'label': labelInput.value, 'link': linkInput.value
      , 'link2': linkInputTwo.value, 'link3': linkInputThree.value, 'pics': picsInput.value}):'')">
        Créer
      </button>
      <button md-raised-button md-dialog-close (click)="(labelInput.value?dialogRef.close({'answer':false, 'label': labelInput.value, 'link': linkInput.value, 'pics': picsInput.value}):'')">Annuler</button>
    </md-dialog-actions>
  `
})
export class CreationDialog {
  constructor(public dialogRef: MdDialogRef<CreationDialog>) { }
}
