import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { DisciplineTeacherService } from 'src/app/modules/management/services/discipline-teacher.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { IDisciplinesRequest } from 'src/app/modules/schedule/models/disciplinesRequest.model';
import { ISaveScheduleDiscipline, ISchedule, IScheduleDiscipline } from 'src/app/modules/schedule/models/schedule.model';
import { ISubscription } from 'src/app/modules/schedule/models/subscription.model';
import { IScheduleSubscriptionEmailTemplate } from 'src/app/modules/schedule/models/subscriptionEmail.model';
import { ScheduleService } from 'src/app/modules/schedule/services/schedule.service';
import { DayOfWeek } from '../../enums/dayOfWeek.model';
import { Lessons } from '../../enums/lessons.model';
import { IChooseDisciplineDialogData } from '../../models/IChooseDiscpline.model';
import { UsersService } from '../../services/users.service';
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

  private scheduleDisciplines: IScheduleDiscipline[] = [];

  private currentGroupScheduleId: number;

  private currentGroupSchedule: ISchedule;

  private allScheduleDisciplines: IScheduleDiscipline[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: IChooseDisciplineDialogData,
  private dialogRef: MatDialogRef<ChooseDisciplineTeacherWindowComponent>,
  private windowService: WindowService, private disciplineTeacherService: DisciplineTeacherService,
  private scheduleService: ScheduleService, private notificationService: NotificationService,
  private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {

    this.scheduleService.getAllScheduleDisciplines().subscribe(res => {
      this.allScheduleDisciplines = res;
    })

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
      this.currentGroupScheduleId = res.filter(p => p.groupId == this.data.group.id)[0].id;

      this.currentGroupSchedule = res.filter(p => p.groupId == this.data.group.id)[0];

      var scheduleDiscipline: ISaveScheduleDiscipline | undefined;

      if (this.data.choosedDisciplines && this.data.teacher && this.currentGroupScheduleId &&
        (this.data.isLecture == true || this.data.isLecture == false)) {
        scheduleDiscipline = { disciplineId: this.data.choosedDisciplines[0].id, 
        disciplineName: this.data.choosedDisciplines[0].name, teacherId: this.data.teacher.id,
        teacherName: this.data.teacher.name + ' ' + this.data.teacher.surname + ' ' + this.data.teacher.patronymic,
        day: this.data.day, semester: this.data.semester, lesson: this.data.lesson,
        isSelective: this.data.choosedDisciplines[0].isSelective, scheduleId: this.currentGroupScheduleId,
        isLecture: this.data.isLecture, catalogName: this.data.catalogName };

        this.scheduleService.createScheduleDiscipline(scheduleDiscipline).subscribe(res => {
          this.notificationService.showSuccessMessage("New schedule discipline was successfully added!");
          
          var request: IDisciplinesRequest = { groupId: this.data.group.id, semester: this.data.semester };
          this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
            this.scheduleDisciplines = res;
            if (this.data.disciplinesToChoose.every(p => (res.some(o => o.disciplineId == p.id && o.isLecture)) &&
            (res.some(o => o.disciplineId == p.id && !o.isLecture)))) {
              this.notificationService.showSuccessMessage(`Congratulations!\nSchedule of ${this.data.group.cipher} group
              for ${this.data.semester} semester is completely filled!`);

              this.scheduleService.getAllSubscriptions().subscribe(res => {
                const subscriptionsOfScheduleAndSemester: ISubscription[] = res.filter(p => p.scheduleId == this.currentGroupScheduleId
                  && p.semester == this.data.semester);

                    /* export interface IScheduleSubscriptionEmailTemplate
                    {
                        userName: string;
                        scheduleName: string;
                        scheduleLink: string;
                        semester: number;
                    } */

                const selectedEIId: number = this.usersService.getCurrentEIId();
                this.usersService.getEI().subscribe(res => {
                  const currentEI = res.find(p => p.id == selectedEIId);

                  subscriptionsOfScheduleAndSemester.forEach(element => {
                    const emailData: IScheduleSubscriptionEmailTemplate = { userName: element.email, semester: this.data.semester,
                    eiName: currentEI?.name, eiLink: currentEI?.link, groupCipher: this.data.group.cipher };
                    this.scheduleService.sendEmailsForFilledSchedule(emailData).subscribe();
                  });
                })
              })
            }
            this.dialogRef.close();
            this.router.navigateByUrl("schedule/group");
          })
        })
      }

    })
  }

  teacherIsAvailable(teacher: ITeacher): boolean {
    /*const disciplinesOfSelectedTeacherThisDayLessonSemester = this.allScheduleDisciplines.filter(p => p.lesson == this.data.lesson
      &&  p.day == this.data.day && p.semester == this.data.semester && p.teacherId == teacher.id);
    const firstChoosed = this.data.choosedDisciplines != undefined ? this.data.choosedDisciplines[0] : undefined;

    if (disciplinesOfSelectedTeacherThisDayLessonSemester && firstChoosed) {
      return (this.disciplines.filter(p => p.semester == this.data.semester && p.day == this.data.day &&
        p.lesson == this.data.lesson && p.teacherId == teacher.id).length == 0)
        && !(disciplinesOfSelectedTeacherThisDayLessonSemester.some(p => p.isLecture
          && p.disciplineId == firstChoosed.id)) ? true : false;*/
      if (this.allScheduleDisciplines.some(p => p.lesson == this.data.lesson &&  p.day == this.data.day &&
        p.semester == this.data.semester && p.teacherId == teacher.id)) {
      const disciplinesOfSelectedTeacherThisDayLessonSemester = this.allScheduleDisciplines.filter(p => p.lesson == this.data.lesson
        &&  p.day == this.data.day && p.semester == this.data.semester && p.teacherId == teacher.id);
      const firstChoosed = this.data.choosedDisciplines != undefined ? this.data.choosedDisciplines[0] : undefined;
        if (firstChoosed) {
          if (disciplinesOfSelectedTeacherThisDayLessonSemester.some(p => !p.isLecture
            && p.disciplineId == firstChoosed.id)) {
              return false;
            }
            else {
              return true;
            }
        }
        else {
          return true;
        }
    } else {
      return (this.disciplines.filter(p => p.semester == this.data.semester && p.day == this.data.day &&
        p.lesson == this.data.lesson && p.teacherId == teacher.id).length == 0) ? true : false;
    }
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
    } else if (this.allScheduleDisciplines.some(p => p.lesson == this.data.lesson &&  p.day == this.data.day &&
      p.semester == this.data.semester && p.teacherId == teacher.id)) {
        const disciplinesOfSelectedTeacherThisDayLessonSemester = this.allScheduleDisciplines.filter(p => p.lesson == this.data.lesson
          &&  p.day == this.data.day && p.semester == this.data.semester && p.teacherId == teacher.id);
        const firstChoosed = this.data.choosedDisciplines != undefined ? this.data.choosedDisciplines[0] : undefined;
        if (firstChoosed) {
          if (disciplinesOfSelectedTeacherThisDayLessonSemester.some(p => !p.isLecture
            && p.disciplineId == firstChoosed.id)) {
              return { 'Not-avaible' : true };
            }
            else {
              return { 'Not-avaible' : false };
            }
        }
        else {
          return { 'Not-avaible' : false };
        }
      }
    else {
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
