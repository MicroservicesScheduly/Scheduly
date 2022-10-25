import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreditType } from 'src/app/modules/management/enums/credit-type.model';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { DisciplinesService } from 'src/app/modules/management/services/disciplines.service';
import { getCatalogs } from '../../catalogs.helper';

@Component({
  selector: 'app-edit-disciplines',
  templateUrl: './edit-disciplines.component.html',
  styleUrls: ['./edit-disciplines.component.css']
})
export class EditDisciplinesComponent implements OnInit {

  discipline: IDiscipline;

  id: number;
  
  constructor(private disciplinesService: DisciplinesService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   }); 
  }

  ngOnInit(): void {
    this.disciplinesService.getById(this.id).subscribe(res => this.discipline = res);
  }

}
