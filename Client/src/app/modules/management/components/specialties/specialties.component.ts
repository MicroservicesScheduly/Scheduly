import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { ISpecialty } from '../../models/specialty.model';
import { NotificationService } from '../../services/notification.service';
import { SpecialtiesService } from '../../services/specialties.service';

@Component({
  selector: 'app-specialties',
  templateUrl: './specialties.component.html',
  styleUrls: ['./specialties.component.css']
})
export class SpecialtiesComponent implements OnInit {
  specialties: ISpecialty[] = [];

  allSpecialties: ISpecialty[] = [];

  constructor(private specialtiesService: SpecialtiesService, private router: Router,
    private notificationService: NotificationService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.specialtiesService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.specialties = res);

    this.specialtiesService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => this.allSpecialties = res);
  }

  redirectToEditSpecialty(id: number) {
    this.router.navigateByUrl(`management-edit/edit-specialty/${id}`);
  }

  deleteSpecialty(id: number): void {
    this.specialtiesService.delete(id).subscribe();
    this.specialties = this.specialties.filter(p => p.id !== id);
  }

  getByName(event: Event, value: any) {
    if (value == "") {
      this.specialties = this.allSpecialties;
    } else if (this.allSpecialties.some(p => p.name.toLowerCase().includes(value.toLowerCase()))) {
      this.specialties = this.allSpecialties.filter(p => p.name.toLowerCase().includes(value.toLowerCase()));
    }
    else {
      this.notificationService.showErrorMessage("Nothing found by input name");
    }
  }
}
