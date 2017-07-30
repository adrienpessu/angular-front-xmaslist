import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-creationdialog',
    templateUrl: './creationdialog.component.html',
    styleUrls: ['./creationdialog.component.css']
})
export class CreationdialogComponent implements OnInit {

    constructor(public dialogRef: MdDialogRef<CreationdialogComponent>) {
    }

    create(label: string, link: string, link2: string, link3: string, pics: string) {
        if (label) {
            this.dialogRef.close({
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
