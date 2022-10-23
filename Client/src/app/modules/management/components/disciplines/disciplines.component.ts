import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditType } from '../../enums/credit-type.model';
import { IDiscipline } from '../../models/discipline.model';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent implements OnInit {
  disciplines: IDiscipline[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.disciplines = [
      { id: 1, name: "Name 1", description: "Description 1 Description 1 Description 1 Description 1 Description 1 Description 1",
        course: 2, creditType: CreditType.Exam, hours: 150, isSelective: true, catalog: {id: 1, name: "F-02" } },
      { id: 2, name: "Name 2", description: "Description 2 Description 2 Description 2 Description 2",
        course: 4, creditType: CreditType.Test, hours: 160, isSelective: false },
      { id: 3, name: "Name 1", description: "Description 1 Description 1 Description 1 Description 1 Description 1 Description 1",
        course: 2, creditType: CreditType.Exam, hours: 150, isSelective: true, catalog: {id: 1, name: "F-02" } },
      { id: 4, name: "Name 2", description: "Description 2 Description 2 Description 2 Description 2",
        course: 4, creditType: CreditType.Test, hours: 160, isSelective: false }
    ];
  }

  redirectToCreateDiscipline() {
    this.router.navigateByUrl("management-edit/create-discipline");
  }

  redirectToEditDiscipline(id: number) {
    this.router.navigateByUrl(`management-edit/edit-discipline/${id}`);
  }

}
