import { Component, OnInit } from '@angular/core';
import { CreditType } from '../../enums/credit-type.model';
import { IDiscipline } from '../../models/discipline.model';
import { DisciplinesService } from '../../services/disciplines.service';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.css']
})
export class DisciplinesComponent implements OnInit {
  disciplines: IDiscipline[] = [];

  constructor(private disciplinesService: DisciplinesService) { }

  ngOnInit(): void {
    this.disciplinesService.get().subscribe(res => this.disciplines = res);
  }

}
