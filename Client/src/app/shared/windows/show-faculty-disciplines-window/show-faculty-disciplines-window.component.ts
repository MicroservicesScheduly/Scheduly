import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { IDisciplineTeacher } from 'src/app/modules/management/models/disciplineTeacher.model';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { CatalogsService } from 'src/app/modules/management/services/catalogs.service';
import { DisciplineTeacherService } from 'src/app/modules/management/services/discipline-teacher.service';
import { DisciplinesService } from 'src/app/modules/management/services/disciplines.service';
import { FacultyItemsService } from 'src/app/modules/management/services/faculty-items.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { IDialogDisciplinesData } from '../../models/IDalogDisciplinesData.model';
import { IDialogTeachersData } from '../../models/IDalogTeachersData.model';
import { IDialogButton } from '../../models/IDialogButton.model';
import { IDialogData } from '../../models/IDialogData.model';
import { IDialogFacultiesData } from '../../models/IDialogFacultiesData.model';

@Component({
  selector: 'app-show-faculty-disciplines-window',
  templateUrl: './show-faculty-disciplines-window.component.html',
  styleUrls: ['./show-faculty-disciplines-window.component.css']
})
export class ShowFacultyDisciplinesWindowComponent implements OnInit {

  disciplines: IDiscipline[] = []

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogFacultiesData,
      private dialogRef: MatDialogRef<ShowFacultyDisciplinesWindowComponent>,
      private facultyItemsService: FacultyItemsService
  ) {}

  ngOnInit(): void {
    this.facultyItemsService.getDisciplinesByFacultyId(this.data.faculty.id).subscribe(res => {
      res.forEach(element => {
        if (!this.disciplines.some(p => p.id == element.id)) {
          this.disciplines.push(element);
        }
      }); 
    });
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close();
  }
}
