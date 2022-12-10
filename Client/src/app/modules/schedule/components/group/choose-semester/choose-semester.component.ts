import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-choose-semester',
  templateUrl: './choose-semester.component.html',
  styleUrls: ['./choose-semester.component.css']
})
export class ChooseSemesterComponent implements OnInit {

  @Output() newItemSemEvent = new EventEmitter<number>();

  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("groups/management");
  }

  onChangeSemester(value: any) {
    this.newItemSemEvent.emit(value);
  }

}
