import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup, ISaveGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { Faculty } from 'src/app/modules/management/models/faculty.model';
import { ISpecialty } from 'src/app/modules/management/models/specialty.model';
import { IFacultySpecialty } from 'src/app/modules/management/models/facultySpecialty.model';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';
import { FacultySpecialtyService } from 'src/app/modules/management/services/faculty-specialty.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  @Input() group: IGroup = {} as IGroup;

  id: number;

  specialties: ISpecialty[] = [];

  faculties: Faculty[] = [];

  facultyChoosed: boolean = false;

  facultyId: number;

  constructor(private router: Router, private groupService: GroupsService,
    private route: ActivatedRoute, private facultyService: FacultyService,
    private specialtyService: SpecialtiesService, private facultySpecialties: FacultySpecialtyService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    }); 
  }

  submit(form: NgForm) {
    var group: ISaveGroup = { cipher: form.value["cipher"], course: form.value["course"] as number,
    specialtyId: form.value["specialtyId"] as number, facultyId: this.facultyId,
    universityId: JSON.parse(localStorage.getItem('selectedEI') as string) };

    console.log(group);
    
    this.groupService.create(group).subscribe(res => this.redirectToGroups());

    /*this.groupService.create(form.value)
    .subscribe(() => {
      this.redirectToManagement();
    });*/
  }

  redirectToManagement() {
    this.router.navigateByUrl("/management/faculties");
  }

  redirectToGroups() {
    this.router.navigateByUrl("/groups/management");
  }

  addItem(newItem: number) {
    this.facultySpecialties.getSpecialtiesByFacultyId(newItem).subscribe(res => this.specialties = res);
    this.facultyId = newItem;
    this.facultyChoosed = true;
  }
}