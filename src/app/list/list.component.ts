import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ChildService} from '../child/shared/child.service';
import {PresentService} from './shared/present.service';
import {MdDialog, MdDialogRef, MdSidenav} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {Present} from './shared/present.model';
import {Profile} from '../login/shared/profile.model';
import {CheckdialogComponent} from './checkdialog/checkdialog.component';
import {CreationdialogComponent} from './creationdialog/creationdialog.component';
import {Store} from '@ngrx/store';
import {ListState} from './list.reducer';
import * as action from './list.action';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [ChildService, PresentService]
})
export class ListComponent implements OnInit {

    state: any;

    child: string;

    childId: string;

    profile: Profile;

    dialogRef: MdDialogRef<CheckdialogComponent>;

    dialogCreationRef: MdDialogRef<CreationdialogComponent>;

    @ViewChild('sideNav') sideNav: MdSidenav;

    loading = true;

    constructor(private store: Store<ListState>, private router: Router, private route: ActivatedRoute
        , private childService: ChildService, private presentService: PresentService, public dialog: MdDialog) {
        this.store.select('list').subscribe(s => {
            this.state = s;
        });
    }

    openDialog(uid: string) {
        this.dialogRef = this.dialog.open(CheckdialogComponent, {
            disableClose: false
        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result && result.answer) {
                for (const present of this.state.presents) {
                    if (present.id === uid) {
                        present.santaName = (result.santaName ? result.santaName : 'Père noël');
                        this.loading = true;
                        this.store.dispatch(new action.CheckPresentAction());
                        this.presentService.checkPresent(present).subscribe((e) => {
                                this.store.dispatch(new action.CheckPresentSuccessAction(present));
                                this.loading = false;
                            },
                            error => {
                                this.store.dispatch(new action.AddPresentFailAction());
                                Observable.throw(error)
                            });
                    }
                }
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
                this.store.dispatch(new action.AddPresentAction());
                this.presentService.createPresent(newPresent).subscribe((p: Present) => {
                        this.store.dispatch(new action.AddPresentSuccessAction(p));
                        this.loading = false;
                    },
                    error => {
                        this.store.dispatch(new action.AddPresentFailAction());
                        Observable.throw(error)
                    });
            }
            this.dialogCreationRef = null;
        });
        return false;
    }

    openEditDialog(present: Present) {
        this.dialogCreationRef = this.dialog.open(CreationdialogComponent, {
            disableClose: false,
            data: Object.assign({}, present)
        });

        this.dialogCreationRef.afterClosed().subscribe(result => {
            if (result && result.answer) {
                const newPresent: Present = {
                    id: result.id,
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
                if (!result.id) {
                    this.store.dispatch(new action.AddPresentAction());
                    this.presentService.createPresent(newPresent).subscribe((p: Present) => {
                            this.store.dispatch(new action.AddPresentSuccessAction(p));
                            this.loading = false;
                        },
                        error => {
                            this.store.dispatch(new action.AddPresentFailAction());
                            Observable.throw(error)
                        });
                } else {
                    this.loading = true;
                    this.store.dispatch(new action.EditPresentAction());
                    this.presentService.editPresent(newPresent).subscribe((e) => {
                            this.store.dispatch(new action.EditPresentSuccessAction(newPresent));
                            this.loading = false;
                        },
                        error => {
                            this.store.dispatch(new action.EditPresentFailAction());
                            Observable.throw(error)
                        });
                }
            }
            this.dialogCreationRef = null;
        });
        return false;
    }

    uncheck(uid) {
        for (const present of this.state.presents) {
            if (present.id === uid) {
                present.santaName = '';
                this.loading = true;
                this.store.dispatch(new action.UnCheckPresentAction());
                this.presentService.checkPresent(present).subscribe((e) => {
                        this.store.dispatch(new action.UnCheckPresentSuccessAction(present));
                        this.loading = false;
                    },
                    error => {
                        this.store.dispatch(new action.UnCheckPresentFailAction());
                        Observable.throw(error)
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
        this.loading = true;
        this.store.dispatch(new action.GetPresentsByChildAction());
        this.presentService.getPresentByChild(this.childId).subscribe(
            presents => {
                this.loading = false;
                this.store.dispatch(new action.GetPresentsByChildSuccessAction(presents));
            },
            error => {
                this.store.dispatch(new action.GetPresentsByChildFailAction());
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
        return false;
    }

    remove(id: string) {
        this.loading = true;
        this.store.dispatch(new action.RemovePresentAction());
        this.presentService.removePresent(id).subscribe(
            result => {
                this.store.dispatch(new action.RemovePresentSuccessAction(id));
                this.loading = false;
            },
            error => {
                this.store.dispatch(new action.RemovePresentFailAction());
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

            if (this.profile == null || ['invite', 'admin'].indexOf(this.profile.name) < 0) {
                this.router.navigate(['']);
            }
        } else {
            this.router.navigate(['']);
        }

        this.loading = true;
        this.store.dispatch(new action.GetChildsAction());
        this.childService.getChildren().subscribe((childs: any[]) => {
                this.store.dispatch(new action.GetChildsSuccessAction(childs));
                this.child = childs[0].name;
                this.childId = childs[0].id;
                this.refreshPresents();
            },
            error => {
                this.store.dispatch(new action.GetChildsFailAction());
                Observable.throw(error)
            }
        );

        this.route.params
        // (+) converts string 'id' to a number
            .subscribe((params: Params) => {
                    this.loading = true;
                    this.store.dispatch(new action.GetChildsAction());
                    this.childService.getChildren().subscribe((childs: any[]) => {
                        this.store.dispatch(new action.GetChildsSuccessAction(childs));
                        if (!!params['name']) {
                            childs.filter(child => child.id === params['name']).forEach(child => {
                                this.child = child.name;
                                this.childId = child.id;
                            });
                        } else {
                            this.child = childs[0].name;
                            this.childId = childs[0].id;
                        }
                        this.refreshPresents();
                    });
                },
                error => {
                    this.store.dispatch(new action.GetChildsFailAction());
                    Observable.throw(error)
                }
            );
    }
}
