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

    onlineEvent: Observable<boolean> = Observable.of(!navigator.onLine);

    offLineFlag = false;

    constructor(private router: Router) {
      this.onlineEvent = Observable.merge(
        Observable.fromEvent(window, 'online').map(() => true),
        Observable.fromEvent(window, 'offline').map(() => false));
      this.onlineEvent.subscribe((bool) => {this.offLineFlag = ! bool; console.log('offline', bool)});
    }

    disconnect() {
        localStorage.clear();
        this.router.navigate(['']);
    }

    selectChild() {
      this.router.navigate(['/list/' + this.childId]);
    }

    ngOnInit(): void {}

}
