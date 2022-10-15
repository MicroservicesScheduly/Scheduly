import { Component, OnInit } from '@angular/core';
import { Specialty } from '../../models/specialty.model';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {
  specialties: Specialty[]=[];

  constructor() { }

  ngOnInit(): void {
    this.specialties = [
      { Id: 1, Number: 121, Description: "Description 1 Description 1 Description 1 Description 1"},
      { Id: 2, Number: 123, Description: "Description 2 Description 2 Description 2 Description 2"},
      { Id: 3, Number: 126, Description: "Description 3 Description 3 Description 3 Description 3"},
      { Id: 4, Number: 125, Description: "Description 4 Description 4 Description 4 Description 4"}
    ];
  }

}
