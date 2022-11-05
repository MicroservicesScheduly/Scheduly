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

  CreditType = CreditType;

  constructor(private disciplinesService: DisciplinesService, private router: Router) { }

  ngOnInit(): void {
    this.disciplinesService.get().subscribe(res => this.disciplines = res);
  }

  redirectToEditDiscipline(id: number) {
    this.router.navigateByUrl(`management-edit/edit-discipline/${id}`);
  }

  deleteDiscipline(id: number): void {
    this.disciplinesService.delete(id).subscribe();
    this.disciplines = this.disciplines.filter(p => p.id !== id);
  }

  creditTypeByIndex(index: number): string {
    switch(index)
    {
      case 0:
        return 'Test';
      case 1:
        return 'Exam';
      default:
        return 'Not found';
    }
  }

}
