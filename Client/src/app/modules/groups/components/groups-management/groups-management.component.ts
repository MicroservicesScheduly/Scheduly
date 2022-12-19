import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { Faculty } from 'src/app/modules/management/models/faculty.model';
import { IDisciplinesRequest } from 'src/app/modules/schedule/models/disciplinesRequest.model';
import { ScheduleService } from 'src/app/modules/schedule/services/schedule.service';
import { IScheduleDiscipline } from 'src/app/modules/schedule/models/schedule.model';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { GroupsPageComponent } from '../../groups-page/groups-page.component';

@Component({
  selector: 'app-groups-management',
  templateUrl: './groups-management.component.html',
  styleUrls: ['./groups-management.component.css']
})
export class GroupsManagementComponent implements OnInit {

  groups: IGroup[] = [];

  eiLink: string | undefined;

  private faculties: Faculty[];

  private groupAndDisciplines: { groupId: number, scheduleDisciplines: IScheduleDiscipline[],
    disciplinesToAdd: IDiscipline[], scheduleStatus: string }[] = [];

  constructor(private router: Router, private groupService: GroupsService,
    private facultyService: FacultyService, private specialtyService: SpecialtiesService,
    private usersService: UsersService, private clipboard: Clipboard,
    private notificationService: NotificationService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.usersService.getEILinkById(this.usersService.getCurrentEIId()).subscribe(res => {
      this.eiLink = res.link;
    });

    this.groupService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
      res.forEach(element => {
        this.facultyService.getById(element.facultyId).subscribe(res => element.faculty = res);
        this.specialtyService.getById(element.specialtyId).subscribe(res => element.specialty = res);
        this.groups.push(element);
      });

      this.groups.forEach(element => {
        const semester = this.getCurrentSemesterByGroup(element);
        var request: IDisciplinesRequest = { groupId: element.id, semester: semester };
        this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
          this.scheduleService.getDisciplinesToAddBySpecialtyIdAndSemester({ specialtyId: element.specialtyId,
            semester: semester }).subscribe(res2 => {
              if (!res.length) {
                this.groupAndDisciplines.push({ groupId: element.id, scheduleDisciplines: res, disciplinesToAdd: res2,
                scheduleStatus: "Empty" });
              } else {
                if (res2.every(p => (res.some(o => o.disciplineId == p.id && o.isLecture))
                  && (res.some(o => o.disciplineId == p.id && !o.isLecture)))) {
                  this.groupAndDisciplines.push({ groupId: element.id, scheduleDisciplines: res, disciplinesToAdd: res2,
                      scheduleStatus: "Filled" });
              } else {
                this.groupAndDisciplines.push({ groupId: element.id, scheduleDisciplines: res, disciplinesToAdd: res2,
                  scheduleStatus: "In progress" });
              }
              }
          });
        });
      });
      });

    this.facultyService.get().subscribe(res => this.faculties = res);
  }

  redirectToAddGroup() {
    if (this.faculties.length) {
      this.router.navigateByUrl("/management-edit/create-group");
    } else {
      this.notificationService.showWarningMessage("Add at least one faculty before group creation!");
    }
  }

  redirectToEditGroup(id: number) {
    this.router.navigateByUrl(`/management-edit/edit-group/${id}`);
  }

  deleteGroup(id: number) {
    this.groupService.delete(id).subscribe(res => window.location.reload());
  }

  copyToClipboard() {
    if (this.eiLink) {
      this.clipboard.copy(`http://localhost:4200/schedule/external/group/${this.eiLink}`);
      this.notificationService.showSuccessMessage("Schedule link was copied to clipboard!");
    } else {
      this.notificationService.showErrorMessage("No link to copy!");
    }
  }


  getCurrentSemesterByGroup(group: IGroup) {
    var currentSemestersOfGroup: number[] = [];

    if (group.course == 1) {
      currentSemestersOfGroup = [1, 2];
    } else if (group.course == 2) {
      currentSemestersOfGroup = [3, 4];
    } else if (group.course == 3) {
      currentSemestersOfGroup = [5, 6];
    } else {
      currentSemestersOfGroup = [7, 8];
    }

    var currentMonth = new Date().getMonth() + 1;

    var semester = 0;

    if (currentMonth == 1 || currentMonth == 7 || currentMonth == 8) {
      semester = 0
    } else if (currentMonth >= 9 && currentMonth <= 12) {
      semester = currentSemestersOfGroup[0];
    } else {
      semester = currentSemestersOfGroup[1];
    }

    return semester;
  }

  currentSemesterScheduleStatus(group: IGroup) {
    return this.groupAndDisciplines.filter(p => p.groupId == group.id)[0] ?
      this.groupAndDisciplines.filter(p => p.groupId == group.id)[0].scheduleStatus : "";
  }
}