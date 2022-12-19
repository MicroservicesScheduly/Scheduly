import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { IDisciplinesRequest } from '../../models/disciplinesRequest.model';
import { IScheduleDiscipline } from '../../models/schedule.model';
import { ITeacherDisciplinesRequest } from '../../models/teacherDisciplinesRequest.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  groups: IGroup[] = [];

  selectedTeacherId: number;

  selectedSemester: number;

  scheduleDisciplines: IScheduleDiscipline[] = [];

  scheduleIdAndGroupCipher: { scheduleId: number, groupCipher: string }[] = [];

  private allScheduleDiscipline: IScheduleDiscipline[] = [];

  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService,
    private scheduleService: ScheduleService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.groupService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
      this.groups = res;
    });

    this.scheduleService.get().subscribe(res => {
      res.forEach(element => {
        this.groupService.getById(element.groupId).subscribe(res2 => {
          this.scheduleIdAndGroupCipher.push({ scheduleId: element.id, groupCipher: res2.cipher });
        })
      });
    })

    if (!this.selectedSemester) {
      this.selectedSemester = 1;
    }
  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("groups/management");
  }

  addItemGroup(newItem: any) {
    this.scheduleDisciplines = [];
    if (newItem == 'Select Teacher') {
      this.selectedTeacherId = -1;
    } else {
      this.selectedTeacherId = newItem;
      var request: ITeacherDisciplinesRequest = { teacherId: this.selectedTeacherId, semester: this.selectedSemester };

      this.scheduleService.getTeacherScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
        this.allScheduleDiscipline = res

        res.forEach(element => {
          if (!this.scheduleDisciplines.some(p => p.isLecture == element.isLecture && p.isSelective == element.isSelective
            && p.lesson == element.lesson && p.semester == element.semester && p.teacherId == element.teacherId 
            && p.disciplineId == element.disciplineId && p.day == element.day)) {
            this.scheduleDisciplines.push(element);
          }
        });
      })
    }
  }

  addItemSemester(newItem: any) {
   this.selectedSemester = newItem;
   this.scheduleDisciplines = [];
    var request: ITeacherDisciplinesRequest = { teacherId: this.selectedTeacherId, semester: this.selectedSemester };

    this.scheduleService.getTeacherScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
      this.allScheduleDiscipline = res

      res.forEach(element => {
        if (!this.scheduleDisciplines.some(p => p.isLecture == element.isLecture && p.isSelective == element.isSelective
          && p.lesson == element.lesson && p.semester == element.semester && p.teacherId == element.teacherId 
          && p.disciplineId == element.disciplineId && p.day == element.day)) {
          this.scheduleDisciplines.push(element);
        }
      });
    });
  }

  getDisciplineGroupsByDayAndLesson(day: number, lesson: number) {
    var groupsCiphers: string[] = [];
    this.allScheduleDiscipline.filter(p => p.day == day && p.lesson == lesson).forEach(element => {
      this.scheduleIdAndGroupCipher.filter(o => o.scheduleId == element.scheduleId).forEach(element2 => {
        groupsCiphers.push(element2.groupCipher);
      });
    });
    return groupsCiphers;
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
    return { 'disabled-edit' : true }
  }

  addItemFinish(value: any) {
    console.log(value);
  }

  isExternalRoute() {
    return this.router.url.includes("external");
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
