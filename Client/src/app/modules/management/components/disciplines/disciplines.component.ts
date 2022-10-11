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
    /*this.disciplines = [
      { name: "Name", description: "Description", course: 2, creditType: CreditType.Exam, hours: 150, isSelective: true }
    ];*/
    
  }

}
