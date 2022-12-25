import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EI } from '../../models/EI.model';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.eis = localStorage.getItem('userEIs') ?
      JSON.parse(localStorage.getItem('userEIs') as string) : 
      [];

    this.selectedEIId = localStorage.getItem('selectedEI') ?
      JSON.parse(localStorage.getItem('selectedEI') as string) : 
      [];
  }

  redirectToManagement() {
    this.router.navigateByUrl("management");
  }

  redirectToSchedule() {
    this.router.navigateByUrl("schedule/group");
  }

  changeEI(newEI: any) {
    localStorage.setItem('selectedEI', newEI);
    window.location.reload();
  }

  isManagementSection() {
    return { 'active-path': !this.managementRoutes.some(p => this.router.url.includes(p)) };
  }

  isScheduleSection() {
    return { 'active-path': this.managementRoutes.some(p => this.router.url.includes(p)) };
  }

}
