import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICatalog, ISaveCatalog } from 'src/app/modules/management/models/catalog.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { CatalogsService } from 'src/app/modules/management/services/catalogs.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { IScheduleDiscipline } from 'src/app/modules/schedule/models/schedule.model';
import { ScheduleService } from 'src/app/modules/schedule/services/schedule.service';
import { IDialogButton } from '../../models/IDialogButton.model';
import { IDialogData } from '../../models/IDialogData.model';
import { IReplaceDialogData } from '../../models/IReplaceDialogData.model';

@Component({
  selector: 'app-replace-window',
  templateUrl: './replace-window.component.html',
  styleUrls: ['./replace-window.component.css']
})
export class ReplaceWindowComponent implements OnInit {

  day: number;

  lesson: number;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IReplaceDialogData,
      private dialogRef: MatDialogRef<ReplaceWindowComponent>,
      private notificationService: NotificationService,
      private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close(this.data);
  }

  replace() {
    const replacedDiscipline: IScheduleDiscipline = this.data.disciplineToReplace;
    replacedDiscipline.day = this.day;
    replacedDiscipline.lesson = this.lesson;

    this.scheduleService.updateScheduleDiscipline(replacedDiscipline.id, replacedDiscipline).subscribe(res => {
      this.notificationService.showSuccessMessage("Discipline was successfully replaced!");
      this.dialogRef.close();
    });
  }

  changeDay(value: any) {
    this.day = value;
  }

  changeLesson(value: any) {
    this.lesson = value;
  }

  isAvailableLessonForDay(lesson: number) {
    return !this.data.scheduleDisciplines.some(p => p.day == this.day && p.lesson == lesson);
  }
}
