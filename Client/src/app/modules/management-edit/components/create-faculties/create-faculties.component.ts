import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty, ISaveFaculty } from 'src/app/modules/management/models/faculty.model';
import { ISaveFacultySpecialty } from 'src/app/modules/management/models/facultySpecialty.model';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { FacultySpecialtyService } from 'src/app/modules/management/services/faculty-specialty.service';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { WindowService } from 'src/app/shared/services/window.service';

@Component({
  selector: 'app-create-faculties',
  templateUrl: './create-faculties.component.html',
  styleUrls: ['./create-faculties.component.css']
})
export class CreateFacultiesComponent implements OnInit {

  @Input() faculty: Faculty = {} as Faculty;

  id: number;

  specialties: ISpecialty[] = [];

  selectedSpecialties: ISpecialty[] = [];

  constructor(private router: Router, private facultyService: FacultyService,
    private route: ActivatedRoute, private specialtyService: SpecialtiesService,
    private facultySpecialtyService: FacultySpecialtyService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
   }); 

   this.specialtyService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.specialties = res);
  }

  submit(form: NgForm) {
    var faculty: ISaveFaculty = { description: form.value["description"], name: form.value["name"],
    universityId: JSON.parse(localStorage.getItem('selectedEI') as string) };

    console.log(faculty);

    this.facultyService.create(faculty)
    .subscribe((res) => {
      this.redirectToManagement();
      this.selectedSpecialties.forEach(element => {
        const facultySpecialty: ISaveFacultySpecialty = { specialtyId: element.id, facultyId: res.id };
        this.facultySpecialtyService.create(facultySpecialty).subscribe();
      });
    });

    /*this.facultyService.update(this.id, form.value)
    .subscribe((s) => {
      this.redirectToManagement();
    });*/
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/faculties");
  }

  onAddSpecialty(event: Event, value: any) {
    if(value != "Search") {
      this.specialtyService.getById(value).subscribe(res => this.selectedSpecialties.push(res));
    }
  }

  getFilteredSpecialties() {
    return this.specialties.filter(p => !this.selectedSpecialties.some(x => x.id == p.id)).sort((n1, n2) => (n1 > n2 ? -1 : 1));
  }

  getSelectedSpecialties() {
    return this.specialties.filter(p => !this.selectedSpecialties.some(x => x.id == p.id));
  }

  deleteSpecialty(id: number) {
    this.selectedSpecialties = this.selectedSpecialties.filter(p => p.id != id);
  }

  isEditRoute() {
    return this.router.url.includes("edit-");
  }

}
