import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {AuthGuard} from "../auth.guard";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Input()
  childName: string = '';

  @Input()
  displayToggleButton: boolean = true;

  @Output() onToggleSideNav = new EventEmitter<boolean>();

  constructor(private router: Router){}

  toogleSideNav(){
    this.onToggleSideNav.emit();
  }

  disconnect(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  ngOnInit(): void {}

}
