import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-choose-group',
  templateUrl: './choose-group.component.html',
  styleUrls: ['./choose-group.component.css']
})
export class ChooseGroupComponent implements OnInit {

  groups: IGroup[] = [];

  selectedGroup: IGroup;

  selectedGroupId: number;

  @Output() newItemEvent = new EventEmitter<number>();

  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.usersService.getEI().subscribe(res => {
          const eiByRouteLink = res.find(p => p.link == params['id']);
          if (eiByRouteLink) {
            this.groupService.getByEIId(eiByRouteLink.id).subscribe(res => {
              this.groups = res;
            });
          }
        });
      } else {
        this.groupService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
          this.groups = res;
        });
      }
    });
  }

  isExternalRoute() {
    return this.router.url.includes("external");
  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("groups/management");
  }

  onChangeGroup(value: any) {
    this.newItemEvent.emit(value);
  }

  redirectToGroupSchedule() {
    this.router.navigateByUrl("schedule/group");
  }

}
