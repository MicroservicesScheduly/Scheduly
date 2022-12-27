import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty, ISaveFaculty } from 'src/app/modules/management/models/faculty.model';
import { ISaveFacultySpecialty } from 'src/app/modules/management/models/facultySpecialty.model';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { FacultySpecialtyService } from 'src/app/modules/management/services/faculty-specialty.service';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
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

  finishCreation: boolean = false;

  private faculties: Faculty[] = [];

  constructor(private router: Router, private facultyService: FacultyService,
    private route: ActivatedRoute, private specialtyService: SpecialtiesService,
    private facultySpecialtyService: FacultySpecialtyService, private usersService: UsersService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.facultySpecialtyService.getSpecialtiesByFacultyId(params['id']).subscribe(res => this.selectedSpecialties = res);
        this.id = params['id'];
      }
   }); 

   this.specialtyService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.specialties = res);

   this.facultyService.get().subscribe(res => this.faculties = res);
  }

  submit(form: NgForm) {
    if (this.faculties.some(p => p.name == form.value["name"]) && !this.isEditRoute()) {
      this.notificationService.showErrorMessage("Faculty with this name already exists!");
    } else if (!this.isEditRoute()) {
      this.finishCreation = true;
    
      var faculty: ISaveFaculty = { description: form.value["description"], name: form.value["name"],
      universityId: JSON.parse(localStorage.getItem('selectedEI') as string) };
  
      this.facultyService.create(faculty)
      .subscribe((res) => {
        this.redirectToManagement();
        this.selectedSpecialties.forEach(element => {
          const facultySpecialty: ISaveFacultySpecialty = { specialtyId: element.id, facultyId: res.id };
          this.facultySpecialtyService.create(facultySpecialty).subscribe();
        });
      });
    } else {
      var facultyEdit: Faculty = { description: form.value["description"], name: form.value["name"],
      universityId: JSON.parse(localStorage.getItem('selectedEI') as string), id: this.faculty.id };
  
      const deletedSpecialties: ISpecialty[] = this.specialties
      .filter(o => !this.selectedSpecialties.some(k => k.id == o.id));

      deletedSpecialties.forEach(element => {
        const spec = this.specialties.filter(o =>
            o.id == element.id)[0];

          this.facultySpecialtyService.delete(spec.id).subscribe();
        });

      const addedSpecialties: ISpecialty[] = this.selectedSpecialties
        .filter(o => !this.specialties.some(k => k.id == o.id));

        addedSpecialties.forEach(element => {
        const facultySpecialty: ISaveFacultySpecialty = { specialtyId: element.id, facultyId: this.faculty.id };

        this.facultySpecialtyService.create(facultySpecialty).subscribe();
      });

      this.facultyService.update(this.faculty.id, facultyEdit)
      .subscribe((res) => {
        this.notificationService.showSuccessMessage("Faculty was successfully updated!");
        this.redirectToManagement();
      });
   
    }
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
