import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { IDisciplineTeacher } from 'src/app/modules/management/models/disciplineTeacher.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { CatalogsService } from 'src/app/modules/management/services/catalogs.service';
import { DisciplineTeacherService } from 'src/app/modules/management/services/discipline-teacher.service';
import { DisciplinesService } from 'src/app/modules/management/services/disciplines.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { IDialogDisciplinesData } from '../../models/IDalogDisciplinesData.model';
import { IDialogTeachersData } from '../../models/IDalogTeachersData.model';
import { IDialogButton } from '../../models/IDialogButton.model';
import { IDialogData } from '../../models/IDialogData.model';

@Component({
  selector: 'app-show-teacher-disciplines-window',
  templateUrl: './show-teacher-disciplines-window.component.html',
  styleUrls: ['./show-teacher-disciplines-window.component.css']
})
export class ShowTeacherDisciplinesWindowComponent implements OnInit {
  
  disciplinesId: IDisciplineTeacher[] = []

  disciplines: IDiscipline[] = []

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogDisciplinesData,
      private dialogRef: MatDialogRef<ShowTeacherDisciplinesWindowComponent>,
      private disciplineTeachersService: DisciplineTeacherService,
      private notificationService: NotificationService,
      private disciplineService: DisciplinesService,
  ) {}

  ngOnInit(): void {

    console.log(this.data.disciplinesOfTeacher);
    /*this.disciplineTeachersService.getLecturersByDisciplineId(this.data.discipline.id)
      .subscribe(res => this.lecturers = res);

    this.disciplineTeachersService.getPracticiansByDisciplineId(this.data.discipline.id)
      .subscribe(res => this.practicians = res);*/
    
    /*this.disciplineTeachersService.get().subscribe((res) => {
      this.disciplinesId = res.filter(p => p.teacherId == this.data.teacher.id);
      console.log(this.disciplinesId);
      res.forEach(element => {
        this.disciplineService.getById(element.disciplineId).subscribe((res) => {
          console.log(res);
          this.disciplines.push(res);
        });
      });
    })*/
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close();
  }
}
