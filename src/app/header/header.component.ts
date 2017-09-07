import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

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

    constructor(private router: Router) {
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
