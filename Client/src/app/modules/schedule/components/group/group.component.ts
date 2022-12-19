import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  private link: string;

  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService,
    private scheduleService: ScheduleService, private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    localStorage.setItem('externalGroupId', JSON.stringify(-1));
    localStorage.setItem('externalSemester', JSON.stringify(1));

    if (!this.selectedSemester) {
      this.selectedSemester = 1;
    }

    this.route.params.subscribe(params => {
      this.link = params['id'];
      if (params['id']) {
        this.usersService.getEI().subscribe(res => {
          const eiByRouteLink = res.find(p => p.link == params['id']);
          if (eiByRouteLink) {
            this.groupService.getByEIId(eiByRouteLink.id).subscribe(res => {
              this.groups = res;
            });
          }
        });
      } else {
        this.groupService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
          this.groups = res;
        });
      }
    });
  }

  isExternalRoute() {
    return this.router.url.includes("external");
  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("groups/management");
  }

  redirectToTeacherSchedule() {
    localStorage.setItem('externalGroupId', JSON.stringify(-1));
    localStorage.setItem('externalSemester', JSON.stringify(-1));

    if (this.isExternalRoute() && this.link) {
      this.router.navigateByUrl(`schedule/external/teacher/${this.link}`);
    } else {
      this.router.navigateByUrl("schedule/teacher");
    }
  }

  redirectToEditSchedule() {
    var selectedGroup: IGroup = this.groups.filter(p => p.id == this.selectedGroupId)[0];

    if (selectedGroup.course == 1)
    {
      if (!(this.selectedSemester == 1 || this.selectedSemester == 2))
      {
        this.notificationService.showErrorMessage("You can edit schedule only for current group course semesters!")
      }
      else {
        this.router.navigateByUrl("schedule/edit-group-schedule",
        { state: { group: JSON.stringify(selectedGroup as unknown as string), semester: this.selectedSemester } });
      }
    }
    else if (selectedGroup.course == 2)
    {
      if (!(this.selectedSemester == 3 || this.selectedSemester == 4))
      {
        this.notificationService.showErrorMessage("You can edit schedule only for current group course semesters!")
      }
      else {
        this.router.navigateByUrl("schedule/edit-group-schedule", 
        { state: { group: JSON.stringify(selectedGroup as unknown as string), semester: this.selectedSemester } });
      }
    }
    else if (selectedGroup.course == 3)
    {
      if (!(this.selectedSemester == 5 || this.selectedSemester == 6))
      {
        this.notificationService.showErrorMessage("You can edit schedule only for current group course semesters!")
      }
      else {
        this.router.navigateByUrl("schedule/edit-group-schedule", 
        { state: { group: JSON.stringify(selectedGroup as unknown as string), semester: this.selectedSemester } });
      }
    }
    else if (selectedGroup.course == 4)
    {
      if (!(this.selectedSemester == 7 || this.selectedSemester == 8))
      {
        this.notificationService.showErrorMessage("You can edit schedule only for current group course semesters!")
      }
      else {
        this.router.navigateByUrl("schedule/edit-group-schedule", 
        { state: { group: JSON.stringify(selectedGroup as unknown as string), semester: this.selectedSemester } });
      }
    }
    else {
      console.log(false);
    }

  }

  addItemGroup(newItem: any) {
    if (newItem == 'Select Group') {
      this.selectedGroupId = -1;
      localStorage.setItem('externalGroupId', JSON.stringify(-1));
    } else {
      this.selectedGroupId = newItem;
      localStorage.setItem('externalGroupId', JSON.stringify(newItem));
      var request: IDisciplinesRequest = { groupId: this.selectedGroupId, semester: this.selectedSemester };
      this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
        this.scheduleDisciplines = res;
      })
    }
  }

  addItemSemester(newItem: any) {
    this.selectedSemester = newItem;
    localStorage.setItem('externalSemester', JSON.stringify(newItem));
    var request: IDisciplinesRequest = { groupId: this.selectedGroupId, semester: this.selectedSemester };
    this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
      this.scheduleDisciplines = res;
    })
  }

  searchByDayAndLesson(day: number, lesson: number) {
    return this.scheduleDisciplines.filter(p => p.day == day && p.lesson == lesson);
  }

  containsSelective(day: number, lesson: number) {
    return this.searchByDayAndLesson(day, lesson).some(p => p.catalogName);
  }

  getCatalogName(day: number, lesson: number) {
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

  isGroupSelected() {
    return { 'disabled-edit' : !this.selectedGroupId }
  }

  addItemFinish(value: any) {
    console.log(value);
  }

  isTodayForExternal(day: number) {
    var now = new Date();
    if (this.isExternalRoute() && now.getDay() == day) {
      return { 'today' : true }
    }
    else {
      return { 'today' : false }
    }
  }
}
