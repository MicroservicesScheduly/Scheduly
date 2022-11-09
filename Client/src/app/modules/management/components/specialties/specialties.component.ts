import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ISpecialty } from '../../models/specialty.model';
import { SpecialtiesService } from '../../services/specialties.service';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {
  specialties: ISpecialty[]=[];

  constructor(private specialtiesService: SpecialtiesService, private router: Router) { }

  ngOnInit(): void {
    this.specialtiesService.get().subscribe(res => this.specialties = res);
  }

  redirectToEditSpecialty(id: number) {
    this.router.navigateByUrl(`management-edit/edit-specialty/${id}`);
  }

  deleteSpecialty(id: number): void {
    this.specialtiesService.delete(id).subscribe();
    this.specialties = this.specialties.filter(p => p.id !== id);
  }

}
