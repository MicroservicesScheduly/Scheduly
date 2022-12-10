import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { IDisciplinesRequest } from '../../models/disciplinesRequest.model';
import { IScheduleDiscipline } from '../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: IGroup[] = [];

  selectedGroupId: number;

  selectedSemester: number;

  scheduleDisciplines: IScheduleDiscipline[] = [];

  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService,
    private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.groupService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
      this.groups = res;
    });

    if (!this.selectedSemester) {
      this.selectedSemester = 1;
    }
  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("groups/management");
  }

  addItemGroup(newItem: any) {
    this.selectedGroupId = newItem;
    var request: IDisciplinesRequest = { groupId: this.selectedGroupId, semester: this.selectedSemester };
    this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
      console.log(res);
      this.scheduleDisciplines = res;
    })
  }

  addItemSemester(newItem: any) {
    this.selectedSemester = newItem;
    var request: IDisciplinesRequest = { groupId: this.selectedGroupId, semester: this.selectedSemester };
    this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
      console.log(res);
      this.scheduleDisciplines = res;
    })
  }

  /*onChangeGroup(value: any) {
    this.selectedGroupId = value;
  }*/
}
