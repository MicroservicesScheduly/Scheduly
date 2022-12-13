import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { DisciplineTeacherService } from 'src/app/modules/management/services/discipline-teacher.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { IDisciplinesRequest } from 'src/app/modules/schedule/models/disciplinesRequest.model';
import { ISaveScheduleDiscipline, IScheduleDiscipline } from 'src/app/modules/schedule/models/schedule.model';
import { ScheduleService } from 'src/app/modules/schedule/services/schedule.service';
import { DayOfWeek } from '../../enums/dayOfWeek.model';
import { Lessons } from '../../enums/lessons.model';
import { IChooseDisciplineDialogData } from '../../models/IChooseDiscpline.model';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-choose-discipline-teacher-window',
  templateUrl: './choose-discipline-teacher-window.component.html',
  styleUrls: ['./choose-discipline-teacher-window.component.css']
})
export class ChooseDisciplineTeacherWindowComponent implements OnInit {

  daysOfWeek = DayOfWeek;

  lessons = Lessons;

  teacherIsSelected: boolean = false;

  disciplineTeachers: ITeacher[] = [];

  processIsStarted: boolean = false;

  disciplines: IScheduleDiscipline[] = [];

  @Output() newItemEvent = new EventEmitter<number>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IChooseDisciplineDialogData,
  private dialogRef: MatDialogRef<ChooseDisciplineTeacherWindowComponent>,
  private windowService: WindowService, private disciplineTeacherService: DisciplineTeacherService,
  private scheduleService: ScheduleService, private notificationService: NotificationService,
  private router: Router) { }

  ngOnInit(): void {
    if (this.data.choosedDisciplines) {
      if (this.data.isLecture) {
        this.disciplineTeacherService.getLecturersByDisciplineId(this.data.choosedDisciplines[0].id).subscribe(res => {
          this.disciplineTeachers = res;
        })
      } else {
        this.disciplineTeacherService.getPracticiansByDisciplineId(this.data.choosedDisciplines[0].id).subscribe(res => {
          this.disciplineTeachers = res;
        })
      }
    }

    var request: IDisciplinesRequest = { groupId: this.data.group.id, semester: this.data.semester };
    this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
      this.disciplines = res;
    })
  }

  onAddDiscipline(value: any) {
    this.newItemEvent.emit(value);
  }

  
  getStatus() {
    if (this.data.choosedDisciplines) {
      return this.data.choosedDisciplines[0].isSelective ? "Selective" : "Mandatory";
    } else {
      return "";
    }
  }

  getDayTitleByNumber(day: number) {
    return Object.values(this.daysOfWeek)[day];
  }

  getLessonTimeTitleByNumber(lesson: number) {
    return Object.values(this.lessons)[lesson];
  }

  getLessonType() {
    return this.data.isLecture ? "Lecture" : "Practice";
  }

  onClick(event: EventEmitter<void>) {
    event?.next();
    this.dialogRef.close();
  }

  toAddDiscipline() {
    this.processIsStarted = true;

    this.notificationService.showInfoMessage("Adding the new discipline... Please wait");

    this.scheduleService.get().subscribe(res => {
      const currentGroupScheduleId = res.filter(p => p.groupId == this.data.group.id)[0].id;

      var scheduleDiscipline: ISaveScheduleDiscipline | undefined;

      if (this.data.choosedDisciplines && this.data.teacher && currentGroupScheduleId &&
        (this.data.isLecture == true || this.data.isLecture == false)) {

        scheduleDiscipline = { disciplineId: this.data.choosedDisciplines[0].id, 
        disciplineName: this.data.choosedDisciplines[0].name, teacherId: this.data.teacher.id,
        teacherName: this.data.teacher.name + ' ' + this.data.teacher.surname + ' ' + this.data.teacher.patronymic,
        day: this.data.day, semester: this.data.semester, lesson: this.data.lesson,
        isSelective: this.data.choosedDisciplines[0].isSelective, scheduleId: currentGroupScheduleId,
        isLecture: this.data.isLecture, catalogName: this.data.catalogName }
        
        this.scheduleService.createScheduleDiscipline(scheduleDiscipline).subscribe(res => {
          this.notificationService.showSuccessMessage("New schedule discipline was successfully added!");
          this.dialogRef.close();
          this.router.navigateByUrl("schedule/group");
        })
      }

    })
  }

  teacherIsAvailable(teacher: ITeacher): boolean {
    return this.disciplines.filter(p => p.semester == this.data.semester && p.day == this.data.day &&
      p.lesson == this.data.lesson && p.teacherId == teacher.id).length == 0 ? true : false;
  }

  selectTeacher(teacher: ITeacher) {
    this.data.teacher = teacher;
  }

  isNotAvailable(teacher: ITeacher) {
    let selected: boolean = this.isSelectedTeacher(teacher);

    if (!this.teacherIsAvailable(teacher)) {
      if (selected) {
        return { 'Not-avaible' : true, 'selected-teacher' : true };
      } else {
        return { 'Not-avaible' : true };
      }
    } else {
      if (selected) {
        return { 'selected-type': this.data.isLecture == false, 'selected-teacher' : true };
      } else {
        return { 'selected-type': this.data.isLecture == false };
      }
    }
  }

  isSelectedTeacher(teacher: ITeacher) {
    if (this.data.teacher?.id == teacher.id) {
      return true;
    } else {
      return false;
    }
  }
}
