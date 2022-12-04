import { Component, OnInit } from '@angular/core';
import { IGroup } from 'src/app/modules/management/models/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: IGroup[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
