import { Component, OnInit } from '@angular/core';
import { CreditType } from '../../enums/credit-type.model';
import { IDiscipline } from '../../models/discipline.model';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent implements OnInit {
  disciplines: IDiscipline[] = [];

  constructor() { }

  ngOnInit(): void {
    this.disciplines = [
      { name: "Name 1", description: "Description 1 Description 1 Description 1 Description 1 Description 1 Description 1",
        course: 2, creditType: CreditType.Exam, hours: 150, isSelective: true, catalog: "F-02" },
      { name: "Name 2", description: "Description 2 Description 2 Description 2 Description 2",
        course: 4, creditType: CreditType.Test, hours: 160, isSelective: false },
        { name: "Name 1", description: "Description 1 Description 1 Description 1 Description 1 Description 1 Description 1",
        course: 2, creditType: CreditType.Exam, hours: 150, isSelective: true, catalog: "F-02" },
      { name: "Name 2", description: "Description 2 Description 2 Description 2 Description 2",
        course: 4, creditType: CreditType.Test, hours: 160, isSelective: false }
    ];
  }

}
