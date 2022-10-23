import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private disciplinesService: DisciplinesService, private router: Router) { }

  ngOnInit(): void {
    this.disciplinesService.get().subscribe(res => this.disciplines = res);
  }

  redirectToCreateDiscipline() {
    this.router.navigateByUrl("management-edit/create-discipline");
  }

  redirectToEditDiscipline(id: number) {
    this.router.navigateByUrl(`management-edit/edit-discipline/${id}`);
  }

}
