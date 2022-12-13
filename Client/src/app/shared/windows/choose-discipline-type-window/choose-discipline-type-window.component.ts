import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { DayOfWeek } from '../../enums/dayOfWeek.model';
import { Lessons } from '../../enums/lessons.model';
import { IChooseDisciplineDialogData } from '../../models/IChooseDiscpline.model';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-choose-discipline-type-window',
  templateUrl: './choose-discipline-type-window.component.html',
  styleUrls: ['./choose-discipline-type-window.component.css']
})
export class ChooseDisciplineTypeWindowComponent implements OnInit {

  daysOfWeek = DayOfWeek;

  lessons = Lessons;

  typeIsSelected: boolean = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: IChooseDisciplineDialogData,
  private dialogRef: MatDialogRef<ChooseDisciplineTypeWindowComponent>,
  private windowService: WindowService) { }

  ngOnInit(): void {
    console.log(this.data);
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

  setIsLecture(value: boolean) {
    this.data.isLecture = value;
    this.typeIsSelected = true;
  }

  isLecture() {
    return { 'selected-type': this.data.isLecture == true };
  }

  isPractice() {
    return { 'selected-type': this.data.isLecture == false };
  }

  isLectureText() {
    return { 'selected-type-text': this.data.isLecture == true };
  }

  isPracticeText() {
    return { 'selected-type-text': this.data.isLecture == false };
  }

  onClick(event: EventEmitter<void>) {
    event?.next();
    this.dialogRef.close();
  }

  toChooseTeacher() {
    this.windowService.openChooseDisciplineTeacherDialog({
      buttons: [
          {
            title: "Cancel",
            onClickEvent: new EventEmitter<void>(),
          },
      ],
      title: 'Add discipline',
      group: this.data.group,
      day: this.data.day,
      lesson: this.data.lesson,
      disciplinesToChoose: this.data.disciplinesToChoose,
      choosedDisciplines: this.data.choosedDisciplines,
      isLecture: this.data.isLecture,
      semester: this.data.semester,
      catalogName: this.data.catalogName
  });
    this.dialogRef.close();
  }

  lessonTypeExists(isLecture: boolean): boolean {
    let choosedDiscipline: IDiscipline = {} as IDiscipline;

    if (this.data.choosedDisciplines) {
      choosedDiscipline = this.data.choosedDisciplines[0];
    }

    if (this.data.scheduleDisciplines) {
      return this.data.scheduleDisciplines?.some(p => p.disciplineId == choosedDiscipline.id
        && p.isLecture == isLecture);
    } else {
      return false;
    }
  }
  
}
