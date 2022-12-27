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
import { ScheduleService } from 'src/app/modules/schedule/services/schedule.service';
import { ISaveSchedule } from 'src/app/modules/schedule/models/schedule.model';
import { NotificationService } from 'src/app/modules/management/services/notification.service';

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

  private groups: IGroup[] = [];

  constructor(private router: Router, private groupService: GroupsService,
    private route: ActivatedRoute, private facultyService: FacultyService,
    private specialtyService: SpecialtiesService, private facultySpecialties: FacultySpecialtyService,
    private scheduleService: ScheduleService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.groupService.getById(params['id']).subscribe(res => {
          this.group = res;
          this.facultySpecialties.getSpecialtiesByFacultyId(res.facultyId).subscribe(res => this.specialties = res);
          this.facultyId = res.facultyId;
          this.facultyChoosed = true;
        });
      }
    }); 

    this.groupService.get().subscribe(res => this.groups = res);
  }

  submit(form: NgForm) {
    if (this.groups.some(p => p.cipher == form.value["cipher"]) && !this.isEditRoute()) {
      this.notificationService.showErrorMessage("Group with this cipher already exists!");
    } else if (!this.isEditRoute()) {
      var group: ISaveGroup = { cipher: form.value["cipher"], course: form.value["course"] as number,
      specialtyId: form.value["specialtyId"] as number, facultyId: this.facultyId,
      universityId: JSON.parse(localStorage.getItem('selectedEI') as string) };
      
      this.groupService.create(group).subscribe(res => {
        var schedule: ISaveSchedule = { groupId: res.id };
        this.scheduleService.create(schedule).subscribe(res => this.redirectToGroups());
      });
    } else {
      var groupEdit: IGroup = { cipher: form.value["cipher"], course: form.value["course"] as number,
      specialtyId: form.value["specialtyId"] as number, facultyId: this.facultyId,
      universityId: JSON.parse(localStorage.getItem('selectedEI') as string), id: this.group.id };
      
      this.groupService.update(this.group.id, groupEdit).subscribe(res => {
        this.notificationService.showSuccessMessage("Group was successfully updated!");
        this.redirectToGroups();
      });
    }
  }

  redirectToManagement() {
    this.router.navigateByUrl("groups/management");
  }

  redirectToGroups() {
    this.router.navigateByUrl("/groups/management");
  }

  addItem(newItem: number) {
    this.facultySpecialties.getSpecialtiesByFacultyId(newItem).subscribe(res => this.specialties = res);
    this.facultyId = newItem;
    this.facultyChoosed = true;
  }

  isEditRoute() {
    return this.router.url.includes("edit-");
  }
}