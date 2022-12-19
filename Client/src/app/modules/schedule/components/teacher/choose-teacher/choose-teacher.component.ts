import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { TeachersService } from 'src/app/modules/management/services/teachers.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-choose-teacher',
  templateUrl: './choose-teacher.component.html',
  styleUrls: ['./choose-teacher.component.css']
})
export class ChooseTeacherComponent implements OnInit {

  groups: IGroup[] = [];

  selectedGroup: IGroup;

  selectedGroupId: number;

  teachers: ITeacher[] = [];

  private link: string;

  @Output() newItemEvent = new EventEmitter<number>();

  constructor(private router: Router, private teacherService: TeachersService, private usersService: UsersService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.usersService.getEI().subscribe(res => {
          this.link = params['id'];
          const eiByRouteLink = res.find(p => p.link == params['id']);
          if (eiByRouteLink) {
            this.teacherService.getByEIId(eiByRouteLink.id).subscribe(res => {
              this.teachers = res;
            });
          }
        });
      } else {
        this.teacherService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
          this.teachers = res;
        });
      }
    });

  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("groups/management");
  }

  isExternalRoute() {
    return this.router.url.includes("external");
  }
  
  onChangeTeacher(value: any) {
    this.newItemEvent.emit(value);
  }

  redirectToGroupSchedule() {
    if (this.isExternalRoute() && this.link) {
      this.router.navigateByUrl(`schedule/external/group/${this.link}`);
    } else {
      this.router.navigateByUrl("schedule/group");
    }
  }

  getFilteredTeachers() {
    return this.teachers.sort((a, b) => a.surname < b.surname ? -1 : a.surname > b.surname ? 1 : 0)
  }
}
