import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-choose-catalog',
  templateUrl: './choose-catalog.component.html',
  styleUrls: ['./choose-catalog.component.css']
})
export class ChooseCatalogComponent implements OnInit {

  @Input() catalogsOfDisciplinesToAdd: ICatalog[] = [];
  
  @Output() newItemEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {

  }

  onChangeCatalog(value: any) {
    this.newItemEvent.emit(value);
  }

}
