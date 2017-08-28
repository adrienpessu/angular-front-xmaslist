import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogConfig, MdDialogRef} from '@angular/material';
import {Present} from '../shared/present.model';

@Component({
    selector: 'app-creationdialog',
    templateUrl: './creationdialog.component.html',
    styleUrls: ['./creationdialog.component.css']
})
export class CreationdialogComponent implements OnInit {

    present: Present;

    config: MdDialogConfig;

    constructor(public dialogRef: MdDialogRef<CreationdialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
        if (!this.data) {
            this.data = new Present();
        }
    }

    createOrUpdate(id: string, label: string, link: string, link2: string, link3: string, pics: string) {
        if (label) {
            this.dialogRef.close({
                'id': id,
                'answer': true, 'label': label, 'link': link
                , 'link2': link2, 'link3': link3, 'pics': pics
            })
        }
    }

    cancel() {
        this.dialogRef.close({'answer': false});
    }

    ngOnInit() {
    }

}
