import { Component, OnInit } from '@angular/core';
import { CreditType } from 'src/app/modules/management/enums/credit-type.model';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { getCatalogs } from '../../catalogs.helper';

@Component({
  selector: 'app-edit-disciplines',
  templateUrl: './edit-disciplines.component.html',
  styleUrls: ['./edit-disciplines.component.css']
})
export class EditDisciplinesComponent implements OnInit {

  discipline: IDiscipline = { id: 1, name: "Name 1", description: "Description 1 Description 1 Description 1 Description 1 Description 1 Description 1",
  course: 2, creditType: CreditType.Exam, hours: 150, isSelective: true, catalog: getCatalogs()[1] };
  
  constructor() { }

  ngOnInit(): void {
  }

}
