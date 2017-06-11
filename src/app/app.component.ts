import {Component, OnInit} from '@angular/core';
import {Profile} from "./login/shared/profile.model";
import {NavigationEnd} from "@angular/router";
import {AuthGuard} from "./auth.guard";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';

  constructor(){}

}
