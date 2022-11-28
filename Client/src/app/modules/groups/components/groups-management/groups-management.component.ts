import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';

@Component({
  selector: 'app-groups-management',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.css']
})
export class GroupsManagementComponent implements OnInit {

  groups: IGroup[] = [];

  constructor(private router: Router, private groupService: GroupsService,
    private facultyService: FacultyService, private specialtyService: SpecialtiesService) { }

  ngOnInit(): void {
    this.groupService.get().subscribe(res => {
      res.forEach(element => {
        this.facultyService.getById(element.facultyId).subscribe(res => element.faculty = res);
        this.specialtyService.getById(element.specialtyId).subscribe(res => element.specialty = res);
        this.groups.push(element);
      });
    });
  }

  redirectToAddGroup() {
    this.router.navigateByUrl("/management-edit/create-group");
  }

  redirectToEditGroup(id: number) {
    this.router.navigateByUrl(`/management-edit/edit-group/${id}`);
  }

  deleteGroup(id: number) {
    this.groupService.delete(id).subscribe(res => window.location.reload());
  }
}