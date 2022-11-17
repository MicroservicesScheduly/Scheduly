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
  selector: 'app-show-faculty-specialties-window',
  templateUrl: './show-faculty-specialties-window.component.html',
  styleUrls: ['./show-faculty-specialties-window.component.css']
})
export class ShowFacultySpecialtiesWindowComponent implements OnInit {

  specialties: ISpecialty[] = []

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogFacultiesData,
      private dialogRef: MatDialogRef<ShowFacultySpecialtiesWindowComponent>,
      private facultyItemsService: FacultyItemsService
  ) {}

  ngOnInit(): void {
    this.facultyItemsService.getSpecialtiesByFacultyId(this.data.faculty.id).subscribe(res => this.specialties = res);
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close();
  }
}
