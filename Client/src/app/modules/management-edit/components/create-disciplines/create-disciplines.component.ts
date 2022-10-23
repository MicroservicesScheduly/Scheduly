import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditType } from 'src/app/modules/management/enums/credit-type.model';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { Teacher } from 'src/app/modules/management/models/teacher.model';
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

  lecturers: Teacher[] = [{ Id: 1, Name: "Lecturer 1"}, { Id: 2, Name: "Lecturer 2"},
  { Id: 3, Name: "Lecturer 3"}, { Id: 4, Name: "Lecturer 4"}];

  practicians: Teacher[] = [{ Id: 1, Name: "Practician 1"}, { Id: 2, Name: "Practician 2"},
  { Id: 3, Name: "Koval Vadym Yuriyovich"}, { Id: 4, Name: "Practician 4"}];

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
      this.lecturers = this.lecturers.filter(p => p.Id != id);
    }
    else {
      this.practicians = this.practicians.filter(p => p.Id != id);
    }
  }

  addTeacher() {
      this.windowService.openAddTeacherDialog({
          buttons: [
              {
                  title: "Yes",
                  onClickEvent: new EventEmitter<void>(),
              },
              {
                title: "Cancel",
                  onClickEvent: new EventEmitter<void>(),
              },
          ],
          title: 'TITLE',
          message: 'MESSAGE',
      });
  }
}
