import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Faculty } from 'src/app/modules/management/models/faculty.model';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-create-faculties',
  templateUrl: './create-faculties.component.html',
  styleUrls: ['./create-faculties.component.css']
})
export class CreateFacultiesComponent implements OnInit {

  @Input() faculty: Faculty = {} as Faculty;

  specialties: ISpecialty[] = [{ id: 2, number: 122, description: "dd", name: 'name1' },
    { id: 3, number: 122, description: "dd", name: 'name2'}];

  constructor(private router: Router, private windowService: WindowService, private facultyService: FacultyService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    console.log(form.value);
    
    this.facultyService.create(form.value)
    .subscribe(
      (s) => {
        console.log(s);
      },
    );

    /*this.redirectToManagement();*/
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management");
  }

  addSpecialty() {
    
  }

  deleteSpecialty(id: number) {
    this.specialties = this.specialties.filter(p => p.id != id);
  }

}
