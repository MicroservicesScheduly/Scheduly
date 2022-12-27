import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EI } from '../../models/EI.model';
import { IDialogData } from '../../models/IDialogData.model';
import { UsersService } from '../../services/users.service';
import { ShowInvitationWindowComponent } from '../../windows/show-invitation-window/show-invitation-window.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selectedEIId: number;

  eis: EI[];

  managementRoutes: string[] = ["/management/teachers", "/management/disciplines", "/management/specialties",
  "/management/faculties", "/create-teacher", "/edit-teacher", "/create-discipline", "/edit-discipline",
  "/create-specialty", "/edit-specialty", "/create-faculty", "/edit-faculty"];

  constructor(private router: Router, private userService: UsersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.eis = localStorage.getItem('userEIs') ?
      JSON.parse(localStorage.getItem('userEIs') as string) : 
      [];

    this.selectedEIId = localStorage.getItem('selectedEI') ?
      JSON.parse(localStorage.getItem('selectedEI') as string) : 
      [];

    this.userService.getAllUserEis().subscribe(res => {
      const notAcceptedUserEi = res.filter(o => o.userId == this.userService.user.id && !o.isAnswered);
      if (notAcceptedUserEi.length) {
        notAcceptedUserEi.forEach(element => {
          this.userService.getById(element.userId).subscribe(user => {
            this.userService.getEI().subscribe(allEIs => {
              const thisEI: EI = allEIs.filter(o => o.id == element.eiId)[0];
              let data: IDialogData = {
                buttons: [
                    {
                      title: "Reject",
                      onClickEvent: new EventEmitter<void>(),
                    },
                ],
                title: 'New Invitation!',
                message: `You have new invitation from ${element.userEmailWhoSendInvite}.`,
                additionalMessage: `If you accept it, you will be able
                to manage ${thisEI.name} schedule together!`,
                userEI: element
              };
          
              this.dialog
                .open(ShowInvitationWindowComponent, {
                    data,
                })
                .afterClosed().subscribe();
            });
          });
        });
      }
    });
  }

  redirectToManagement() {
    this.router.navigateByUrl("management");
  }

  redirectToSchedule() {
    this.router.navigateByUrl("schedule/group");
  }

  redirectToSettings() {
    this.router.navigateByUrl("settings");
  }

  changeEI(newEI: any) {
    localStorage.setItem('selectedEI', newEI);
    window.location.reload();
  }

  isManagementSection() {
    return { 'active-path': !this.managementRoutes.some(p => this.router.url.includes(p))
      && !this.managementRoutes.some(p => this.router.url.includes("settings")) };
  }

  isScheduleSection() {
    return { 'active-path': this.managementRoutes.some(p => this.router.url.includes(p))
      && !this.managementRoutes.some(p => this.router.url.includes("settings")) };
  }

  logout() {
    localStorage.removeItem("jwt acces token");
    localStorage.removeItem("id");
    localStorage.removeItem("selectedEI");
    localStorage.removeItem("externalGroupId");
    localStorage.removeItem("externalSemester");
    localStorage.removeItem("userEIs");

    window.location.reload();
  }

}
