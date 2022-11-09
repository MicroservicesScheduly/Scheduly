import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { DisciplinesService } from 'src/app/modules/management/services/disciplines.service';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-create-specialties',
  templateUrl: './create-specialties.component.html',
  styleUrls: ['./create-specialties.component.css']
})
export class CreateSpecialtiesComponent implements OnInit {

  @Input() specialty: ISpecialty = {} as ISpecialty;

  constructor(private router: Router, private specialtyService: SpecialtiesService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.specialtyService.create(form.value)
    .subscribe(() => {
      this.redirectToManagement();
    });

    /*this.specialtyService.update(this.id, form.value)
    .subscribe((s) => {
      this.redirectToManagement();
    });*/
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/specialties");
  }


}