/*import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { IDisciplinesRequest } from '../models/disciplinesRequest.model';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {

  @Input() groupId: number;

  @Input() semester: number;
  
  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService,
    private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    if (!this.semester) {
      this.semester = 1;
    }

    var request: IDisciplinesRequest = { groupId: this.groupId, semester: this.semester };
    this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res =>
      console.log(res));
  }

}
*/