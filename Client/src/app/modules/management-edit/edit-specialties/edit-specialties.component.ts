import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';


@Component({
  selector: 'app-edit-specialties',
  templateUrl: './edit-specialties.component.html',
  styleUrls: ['./edit-specialties.component.css']
})
export class EditSpecialtiesComponent implements OnInit {

  specialty: ISpecialty;

  id: number;

  constructor(private specialtiesService: SpecialtiesService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   }); 
  }

  ngOnInit(): void {
    this.specialtiesService.getById(this.id).subscribe(res => this.specialty = res);
  }
}