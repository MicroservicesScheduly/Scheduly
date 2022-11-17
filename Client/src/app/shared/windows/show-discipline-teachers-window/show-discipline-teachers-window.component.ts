import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { CatalogsService } from 'src/app/modules/management/services/catalogs.service';
import { DisciplineTeacherService } from 'src/app/modules/management/services/discipline-teacher.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { IDialogTeachersData } from '../../models/IDalogTeachersData.model';
import { IDialogButton } from '../../models/IDialogButton.model';
import { IDialogData } from '../../models/IDialogData.model';

@Component({
  selector: 'app-show-discipline-teachers-window',
  templateUrl: './show-discipline-teachers-window.component.html',
  styleUrls: ['./show-discipline-teachers-window.component.css']
})
export class ShowDisciplineTeachersWindowComponent implements OnInit {
  
  practicians: ITeacher[] = [];

  lecturers: ITeacher[] = []

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogTeachersData,
      private dialogRef: MatDialogRef<ShowDisciplineTeachersWindowComponent>,
      private disciplineTeachersService: DisciplineTeacherService,
      private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.disciplineTeachersService.getLecturersByDisciplineId(this.data.discipline.id)
      .subscribe(res => this.lecturers = res);

    this.disciplineTeachersService.getPracticiansByDisciplineId(this.data.discipline.id)
      .subscribe(res => this.practicians = res);
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close();
  }
}
