import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISchedule } from 'src/app/modules/schedule/models/schedule.model';
import { ScheduleService } from 'src/app/modules/schedule/services/schedule.service';
import { EI } from '../../models/EI.model';
import { UsersService } from '../../services/users.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-external-header',
  templateUrl: './external-header.component.html',
  styleUrls: ['./external-header.component.css']
})
export class ExternalHeaderComponent implements OnInit {

  selectedEIId: number;

  eis: EI[];

  eiName: string | undefined = "";

  allSchedules: ISchedule[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UsersService,
    private windowService: WindowService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.eis = localStorage.getItem('userEIs') ?
      JSON.parse(localStorage.getItem('userEIs') as string) : 
      [];

    this.selectedEIId = localStorage.getItem('selectedEI') ?
      JSON.parse(localStorage.getItem('selectedEI') as string) : 
      [];

    const paramLink = this.router.url.split("/")[this.router.url.split("/").length - 1];

    this.usersService.getEI().subscribe(res => {
            this.eiName = res.find(p => p.link == paramLink)?.name;
      });

    this.scheduleService.get().subscribe(res => this.allSchedules = res);
  }

  redirectToManagement() {
    this.router.navigateByUrl("management");
  }

  redirectToSchedule() {
    this.router.navigateByUrl("schedule/group");
  }

  redirectToTry() {
    this.router.navigateByUrl("authorization/registration");
  }

  changeEI(newEI: any) {
    localStorage.setItem('selectedEI', newEI);
    window.location.reload();
  }

  isExternalRoute() {
    return this.router.url.includes("external");
  }

  openSubscribeWindow() {
    const selectedGroupId =  JSON.parse(localStorage.getItem('externalGroupId') as string);;

    const selectedSemester =  JSON.parse(localStorage.getItem('externalSemester') as string);;

    this.windowService.openSubscribeDialog({
      scheduleId: this.allSchedules.find(p => p.groupId == selectedGroupId)?.id,
      semester: selectedSemester
    });
  }

  isExternalRouteForGroupAndGroupIsSelected() {
    const selectedGroupId =  JSON.parse(localStorage.getItem('externalGroupId') as string);;
    return this.isExternalRoute() && selectedGroupId != 'Select Group' && selectedGroupId != -1;
  }

}
