import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditType } from 'src/app/modules/management/enums/credit-type.model';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { WindowService } from 'src/app/shared/services/window.service';
import { getCatalogs } from '../../catalogs.helper';

@Component({
  selector: 'app-create-disciplines',
  templateUrl: './create-disciplines.component.html',
  styleUrls: ['./create-disciplines.component.css']
})
export class CreateDisciplinesComponent implements OnInit {

  @Input() discipline: IDiscipline = {} as IDiscipline;

  creditTypes = Object.values(CreditType);

  /*courses: number[] = [1, 2, 3, 4];*/

  /* ADD real catalogs */
  catalogs: ICatalog[] = getCatalogs();

  lecturers: ITeacher[] = [{ id: 2, name: "Lecturer 2", surname: "", patronymic: ""}, { id: 3, name: "Lecturer 3", surname: "", patronymic: ""},
   { id: 4, name: "Lecturer 4", surname: "", patronymic: ""}];

  practicians: ITeacher[] = [{ id: 1, name: "Practician 1", surname: "", patronymic: ""}, { id: 2, name: "Practician 2", surname: "", patronymic: ""},
  { id: 3, name: "Vadym", surname: "Koval", patronymic: "Yuriyovich"}, { id: 4, name: "Practician 4", surname: "", patronymic: ""}];

  allLecturers: ITeacher[] = [{ id: 1, name: "Lecturer 1", surname: "", patronymic: ""}, { id: 2, name: "Lecturer 2", surname: "", patronymic: ""},
  { id: 3, name: "Lecturer 3", surname: "", patronymic: ""}, { id: 4, name: "Lecturer 4", surname: "", patronymic: ""}];

  allPracticians: ITeacher[] = [{ id: 1, name: "Practician 1", surname: "", patronymic: ""}, { id: 2, name: "Practician 2", surname: "", patronymic: ""},
  { id: 3, name: "Vadym", surname: "Koval", patronymic: "Yuriyovich"}, { id: 4, name: "Practician 4", surname: "", patronymic: ""},
   { id: 5, name: "Practician 5", surname: "", patronymic: ""}];

  constructor(private router: Router, private windowService: WindowService) { }

  ngOnInit(): void {
    if (!this.discipline.creditType) {
      this.discipline.creditType = CreditType.Test;
    }
  }

  submit(form: NgForm) {
    /* ADD submit action */
    this.redirectToManagement();
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management");
  }

  deleteTeacher(id: number, isLecturer: boolean) {
    if (isLecturer) {
      this.lecturers = this.lecturers.filter(p => p.id != id);
    }
    else {
      this.practicians = this.practicians.filter(p => p.id != id);
    }
  }

  addTeacher(addAsLecturer: boolean = true) {
      this.windowService.openAddTeacherDialog({
          buttons: [
              {
                title: "Cancel",
                onClickEvent: new EventEmitter<void>(),
              },
          ],
          title: 'Add Teacher',
          message: addAsLecturer ? 'as a lecturer' : 'as a practician',
          isLecturerAdded: addAsLecturer,
      });
  }

  addCatalog() {

  }

  changeCatalog() {
    
  }
}
