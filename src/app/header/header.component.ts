import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

    @Input()
    childId = '';

    @Input()
    childs: any[] = [];

    onlineFlag = navigator.onLine;

    constructor(private router: Router) {
    }

    checkOnline() {
      return !this.onlineFlag;
    }

    disconnect() {
        localStorage.clear();
        this.router.navigate(['']);
    }

    selectChild() {
      this.router.navigate(['/list/' + this.childId]);
    }

    ngOnInit(): void {
    }

}
