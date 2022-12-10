import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: IGroup[] = [];

  selectedGroupId: number;

  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.groupService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
      this.groups = res;
    });
  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("management-edit/create-group");
  }

  onChangeGroup(value: any) {
    this.selectedGroupId = value;
  }

}
