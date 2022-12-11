import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { IDisciplinesRequest } from '../../models/disciplinesRequest.model';
import { IScheduleDiscipline } from '../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-edit-group-schedule',
  templateUrl: './edit-group-schedule.component.html',
  styleUrls: ['./edit-group-schedule.component.css']
})
export class EditGroupScheduleComponent implements OnInit {

  groups: IGroup[] = [];

  selectedGroupId: number;

  selectedSemester: number;

  scheduleDisciplines: IScheduleDiscipline[] = [];

  selectedGroupForEdit: IGroup;

  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService,
    private scheduleService: ScheduleService, private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.groupService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
      this.groups = res;
    });

    if (!this.selectedSemester) {
      this.selectedSemester = 1;
    }

    this.selectedGroupForEdit = JSON.parse(history.state["group"]);
    console.log(this.selectedGroupForEdit);
  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("groups/management");
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
