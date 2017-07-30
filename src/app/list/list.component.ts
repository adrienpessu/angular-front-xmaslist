import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ChildService} from '../child/shared/child.service';
import {PresentService} from './shared/present.service';
import {MdDialog, MdDialogRef} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Present} from './shared/present.model';
import {Profile} from '../login/shared/profile.model';
import {CheckdialogComponent} from './checkdialog/checkdialog.component';
import {CreationdialogComponent} from './creationdialog/creationdialog.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [ChildService, PresentService]

})
export class ListComponent implements OnInit {

    presents: Present[];

    childs: any[] = [];

    child: string;

    childId: string;

    profile: Profile;

    dialogRef: MdDialogRef<CheckdialogComponent>;

    dialogCreationRef: MdDialogRef<CreationdialogComponent>;

    loading = false;

    constructor(private router: Router, private route: ActivatedRoute, private childService: ChildService
        , private presentService: PresentService, public dialog: MdDialog) {
    }

    openDialog(uid: string) {
        this.dialogRef = this.dialog.open(CheckdialogComponent, {
            disableClose: false
        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result && result.answer) {
                for (const present of this.presents) {
                    if (present.id === uid) {
                        present.santaName = (result.santaName ? result.santaName : 'Père noël');
                        this.loading = true;
                        this.presentService.checkPresent(present).subscribe((e) => {
                            this.refreshPresents();
                            this.loading = false;
                        });
                    }
                }
            } else {
                this.refreshPresents();
            }
            this.dialogRef = null;
        });
        return false;
    }

    openCreationDialog() {
        this.dialogCreationRef = this.dialog.open(CreationdialogComponent, {
            disableClose: false
        });

        this.dialogCreationRef.afterClosed().subscribe(result => {
            if (result && result.answer) {
                const newPresent: Present = {
                    id: '',
                    label: result.label,
                    childId: this.childId,
                    url: result.link,
                    url2: result.link2,
                    url3: result.link3,
                    pics: result.pics,
                    santaName: '',
                    order: 0
                };
                this.loading = true;
                this.presentService.createPresent(newPresent).subscribe((p: Present) => {
                    this.refreshPresents();
                    this.loading = false;
                });
            }
            this.dialogCreationRef = null;
        });
        return false;
    }

    uncheck(uid) {
        for (const present of this.presents) {
            if (present.id === uid) {
                present.santaName = '';
                this.loading = true;
                this.presentService.checkPresent(present).subscribe((e) => {
                    this.refreshPresents();
                    this.loading = false;
                });
            }
        }
    }

    isAdmin() {
        if (!!this.profile && this.profile.name === 'admin') {
            return true;
        }
        return false;
    }

    refreshPresents() {
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
        if (this.profile.name !== 'admin') {
            if (!present.santaName) {
                this.openDialog(present.id)
            }
        } else {
            if (!present.santaName) {
                this.openDialog(present.id)
            } else {
                this.uncheck(present.id)
            }
        }
    }

    remove(id: string) {
        this.loading = true;
        this.presentService.removePresent(id).subscribe(
            result => {
                this.refreshPresents();
                this.loading = false;
            },
            error => {
                Observable.throw(error)
            }
        );
    }

    disconnect() {
        localStorage.clear();
        this.router.navigate(['']);
    }

    ngOnInit() {
        if (localStorage.getItem('profile') !== null) {

            this.profile = JSON.parse(localStorage.getItem('profile'));

            if (this.profile != null && (this.profile.name === 'invite'
                    || this.profile.name === 'admin')) {
                console.log('logged');
            } else {
                this.router.navigate(['']);
            }
        } else {
            this.router.navigate(['']);
        }
        this.loading = true;
        this.childService.getChildren().subscribe((childs: any[]) => {
            this.childs = childs;
            this.child = this.childs[0].name;
            this.childId = this.childs[0].id;
            this.refreshPresents();
            this.loading = false;
        });

        this.route.params
        // (+) converts string 'id' to a number
            .subscribe((params: Params) => {
                this.loading = true;
                this.childService.getChildren().subscribe((childs: any[]) => {
                    this.childs = childs;
                    if (!!params['name']) {
                        this.childs.filter(child => child.id === params['name']).forEach(child => {
                            this.child = child.name;
                            this.childId = child.id;
                        });
                    } else {
                        this.child = this.childs[0].name;
                        this.childId = this.childs[0].id;
                    }
                    this.refreshPresents();

                    this.loading = false;
                });
            });
    }
}
