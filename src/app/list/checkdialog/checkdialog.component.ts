import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-checkdialog',
  templateUrl: './checkdialog.component.html',
  styleUrls: ['./checkdialog.component.css']
})
export class CheckdialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<CheckdialogComponent>) { }

  ngOnInit() {
  }

}
