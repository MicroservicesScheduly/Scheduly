import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
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
    private scheduleService: ScheduleService, private notificationService: NotificationService) { }

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

  redirectToEditSchedule() {
    var selectedGroup: IGroup = this.groups.filter(p => p.id == this.selectedGroupId)[0];
    /*if (!(selectedGroup.course == 1 && (this.selectedSemester == 1 || this.selectedSemester == 2)))
    {
      console.log(!(this.selectedSemester == 1 || this.selectedSemester == 2));
      console.log(!(selectedGroup.course == 1 && (this.selectedSemester == 1 || this.selectedSemester == 2)));
    }
    else if(!(selectedGroup.course == 2 && (this.selectedSemester == 3 || this.selectedSemester == 4)))
    {

    }
    else {
      this.router.navigateByUrl("schedule/edit-group-schedule");
    }*/
    if (selectedGroup.course == 1)
    {
      if (!(this.selectedSemester == 1 || this.selectedSemester == 2))
      {
        this.notificationService.showErrorMessage("You can edit schedule only for current group course semesters!")
      }
      else {
        this.router.navigateByUrl("schedule/edit-group-schedule",
        { state: { group: JSON.stringify(selectedGroup as unknown as string) } });
      }
    }
    else if (selectedGroup.course == 2)
    {
      if (!(this.selectedSemester == 3 || this.selectedSemester == 4))
      {
        this.notificationService.showErrorMessage("You can edit schedule only for current group course semesters!")
      }
      else {
        this.router.navigateByUrl("schedule/edit-group-schedule", { state: { group: selectedGroup } });
      }
    }
    else if (selectedGroup.course == 3)
    {
      if (!(this.selectedSemester == 5 || this.selectedSemester == 6))
      {
        this.notificationService.showErrorMessage("You can edit schedule only for current group course semesters!")
      }
      else {
        this.router.navigateByUrl("schedule/edit-group-schedule", { state: { group: selectedGroup } });
      }
    }
    else if (selectedGroup.course == 4)
    {
      if (!(this.selectedSemester == 7 || this.selectedSemester == 8))
      {
        this.notificationService.showErrorMessage("You can edit schedule only for current group course semesters!")
      }
      else {
        this.router.navigateByUrl("schedule/edit-group-schedule", { state: { group: selectedGroup } });
      }
    }
    else {
      console.log(false);
    }

  }

  addItemGroup(newItem: any) {
    if (newItem == 'Select Group') {
      this.selectedGroupId = -1;
    } else {
      this.selectedGroupId = newItem;
      var request: IDisciplinesRequest = { groupId: this.selectedGroupId, semester: this.selectedSemester };
      this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
        this.scheduleDisciplines = res;
      })
    }
  }

  addItemSemester(newItem: any) {
    this.selectedSemester = newItem;
    var request: IDisciplinesRequest = { groupId: this.selectedGroupId, semester: this.selectedSemester };
    this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
      this.scheduleDisciplines = res;
    })
  }

  searchByDayAndLesson(day: number, lesson: number) {
    return this.scheduleDisciplines.filter(p => p.day == day && p.lesson == lesson);
  }

  containsSelective(day: number, lesson: number) {
    /*console.log(`${day} ${lesson} -> ${this.searchByDayAndLesson(day, lesson).some(p => p.isSelective)} ->
    ${this.searchByDayAndLesson(day, lesson)[0].isSelective} --> CATALOG NAME = ${this.searchByDayAndLesson(day, lesson)[0].catalogName}`);*/
    
    /*if (day == 2 && lesson == 2) {
      console.log(this.searchByDayAndLesson(day, lesson));
      console.log(this.searchByDayAndLesson(day, lesson).some(p => p.isSelective));
    }*/
    return this.searchByDayAndLesson(day, lesson).some(p => p.catalogName);
  }

  getCatalogName(day: number, lesson: number) {
    /*console.log(`${day} ${lesson} -> ${this.searchByDayAndLesson(day, lesson).some(p => p.isSelective)} ->
    ${this.searchByDayAndLesson(day, lesson)[0].isSelective} --> CATALOG NAME = ${this.searchByDayAndLesson(day, lesson)[0].catalogName}`);*/
    
    /*if (day == 2 && lesson == 2) {
      console.log(this.searchByDayAndLesson(day, lesson));
      console.log(this.searchByDayAndLesson(day, lesson).some(p => p.isSelective));
    }*/
    return this.searchByDayAndLesson(day, lesson)[0].catalogName;
  }

  isEmpty(day: number, lesson: number) {
    return this.searchByDayAndLesson(day, lesson).length == 0;
  }

  endOfDisc(day: number, lesson: number, i: number) {
    return this.searchByDayAndLesson(day, lesson).length == i + 1;
  }

  isEmptyDay(day: number) {
    const isEmptyDay: boolean = this.scheduleDisciplines.some(p => p.day == day);

    return { 'blured': !isEmptyDay };
  }

  /*onChangeGroup(value: any) {
    this.selectedGroupId = value;
  }*/
}
