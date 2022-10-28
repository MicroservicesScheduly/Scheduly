import { Component, OnInit } from '@angular/core';
import { ISpecialty } from '../../models/specialty.model';
import { SpecialtiesService } from '../../services/specialties.service';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {
  specialties: ISpecialty[]=[];

  constructor(private specialtiesService: SpecialtiesService) { }

  ngOnInit(): void {
    this.specialtiesService.get().subscribe(res => this.specialties = res);
  }

}
