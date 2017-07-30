import { Component, OnInit } from '@angular/core';
import {ChildService} from '../shared/child.service';
import {Child} from '../shared/child.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [ChildService]
})
export class MenuComponent implements OnInit {

  children: Child[];

  constructor(private childService: ChildService) { }

  ngOnInit() {
    this.childService.getChildren().subscribe((childs: any[]) => this.children = childs);
  }

}
