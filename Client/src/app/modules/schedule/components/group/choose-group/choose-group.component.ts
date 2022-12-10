import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-choose-group',
  templateUrl: './choose-group.component.html',
  styleUrls: ['./choose-group.component.css']
})
export class ChooseGroupComponent implements OnInit {

  groups: IGroup[] = [];

  selectedGroup: IGroup;

  selectedGroupId: number;

  @Output() newItemEvent = new EventEmitter<number>();

  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.groupService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
      this.groups = res;
    });
  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("groups/management");
  }

  onChangeGroup(value: any) {
    this.newItemEvent.emit(value);
  }

}
