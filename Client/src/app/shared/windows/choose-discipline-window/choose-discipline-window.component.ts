import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { CatalogsService } from 'src/app/modules/management/services/catalogs.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { DayOfWeek } from '../../enums/dayOfWeek.model';
import { Lessons } from '../../enums/lessons.model';
import { IChooseDisciplineDialogData } from '../../models/IChooseDiscpline.model';
import { UsersService } from '../../services/users.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-choose-discipline-window',
  templateUrl: './choose-discipline-window.component.html',
  styleUrls: ['./choose-discipline-window.component.css']
})
export class ChooseDisciplineWindowComponent implements OnInit {

  daysOfWeek = DayOfWeek;

  lessons = Lessons;

  selectedDisciplines: IDiscipline[] = [];

  catalogsOfDisciplinesToAdd: ICatalog[] = [];

  catalogDisciplines: IDiscipline[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: IChooseDisciplineDialogData,
  private dialogRef: MatDialogRef<ChooseDisciplineWindowComponent>, private catalogService: CatalogsService,
  private notificationService: NotificationService, private windowService: WindowService,
  private usersService: UsersService) { }

  ngOnInit(): void {
    const AllCatalogsId: number[] = [];

    this.data.disciplinesToChoose.filter(p => p.isSelective).forEach(element => {
      if (element.catalogId) {
        AllCatalogsId.push(element.catalogId);
      }
    });

    const AllCatalogsIdNew: number[] = [];

    AllCatalogsId.forEach(element => {
      if (!AllCatalogsIdNew.some(p => p === element)) {
        AllCatalogsIdNew.push(element);
      }
    });

    AllCatalogsIdNew.forEach(element => {
      this.catalogService.getById(element).subscribe(res => this.catalogsOfDisciplinesToAdd.push(res));
    });

    if (this.data.addAsCatalogDisciplines) {

      this.catalogService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
        const value = res.filter(p => p.name == this.data.catalogName)[0].id;

        let selective: IDiscipline[] = this.getSelectiveDisciplinesByCatalogId(value);

        let finalSelective: IDiscipline[] = [];

        selective.forEach(element => {
          if (!(this.data.scheduleDisciplines?.some(o => (o.disciplineId == element.id && o.semester == this.data.semester
            && o.isLecture) && this.data.scheduleDisciplines?.some(o => (o.disciplineId == element.id && o.semester == this.data.semester
              && !o.isLecture)))))
          {
            finalSelective.push(element);
          }
        });
    
        finalSelective.forEach(element => {
          if (!this.data.scheduleDisciplines?.some(p => p.disciplineId == element.id && p.semester == this.data.semester
            && p.day == this.data.day && p.lesson == this.data.lesson)) {
              this.catalogDisciplines.push(element);
            }
        });

        /*this.catalogDisciplines = finalSelective;*/
      });

    }
  }

  IsEqual(v1: number, v2?: number) {
    return v1 === v2;
  }

  onClick(event: EventEmitter<void>) {
    event?.next();
    this.dialogRef.close();
  }

  toChooseType() {
    if (this.selectedDisciplines[0].catalogId) {
      this.catalogService.getById(this.selectedDisciplines[0].catalogId).subscribe(res => {
        this.windowService.openChooseDisciplineTypeDialog({
          buttons: [
              {
                title: "Cancel",
                onClickEvent: new EventEmitter<void>(),
              },
          ],
          title: 'Add discipline',
          group: this.data.group,
          day: this.data.day,
          lesson: this.data.lesson,
          disciplinesToChoose: this.data.disciplinesToChoose,
          choosedDisciplines: this.selectedDisciplines,
          semester: this.data.semester,
          catalogName: res.name,
          scheduleDisciplines: this.data.scheduleDisciplines
        });
        this.dialogRef.close();
      });
    } else {
      this.windowService.openChooseDisciplineTypeDialog({
        buttons: [
            {
              title: "Cancel",
              onClickEvent: new EventEmitter<void>(),
            },
        ],
        title: 'Add discipline',
        group: this.data.group,
        day: this.data.day,
        lesson: this.data.lesson,
        disciplinesToChoose: this.data.disciplinesToChoose,
        choosedDisciplines: this.selectedDisciplines,
        semester: this.data.semester,
        scheduleDisciplines: this.data.scheduleDisciplines
      });
      this.dialogRef.close();
    }

    
  }

  getDayTitleByNumber(day: number) {
    return Object.values(this.daysOfWeek)[day];
  }

  getLessonTimeTitleByNumber(lesson: number) {
    return Object.values(this.lessons)[lesson];
  }

  mandatory() {
    let mandatory: IDiscipline[] = this.data.disciplinesToChoose.filter(p => !p.isSelective);

    let finalMandatory: IDiscipline[] = [];

    /*finalMandatory = mandatory.filter(p => (this.data.scheduleDisciplines?.some(o => o.disciplineId == p.id
      && o.isLecture == true)) && (this.data.scheduleDisciplines?.some(o => o.disciplineId == p.id
        && o.isLecture == false)));*/

    mandatory.forEach(element => {
      if (this.data.scheduleDisciplines?.some(o => o.disciplineId == element.id
        && o.isLecture == true) && this.data.scheduleDisciplines?.some(o => o.disciplineId == element.id
          && o.isLecture == false)) {
        } else {
          finalMandatory.push(element);
        }
    });
    
    /*!this.data.scheduleDisciplines?.some(o => o.disciplineId == element.id && o.semester == this.data.semester
        && o.day == this.data.day && o.lesson == this.data.lesson ))*/

    return finalMandatory;
    /*return this.data.disciplinesToChoose.filter(p => !p.isSelective);*/
  }

  selectDiscipline(discipline: IDiscipline) {
    if (discipline.isSelective && this.selectedDisciplines.some(p => !p.isSelective) 
    || !discipline.isSelective && this.selectedDisciplines.some(p => p.isSelective)) {
      this.notificationService.showErrorMessage("You can not choose selective and mandatory discipline simultaneously!");
    } else {
      if (this.selectedDisciplines.some(p => p.id == discipline.id)) {
        this.selectedDisciplines = this.selectedDisciplines.filter(p => p.id != discipline.id);
      }
      else {
        if (discipline.isSelective && this.selectedDisciplines.some(p => p.catalogId == discipline.catalogId)) {
          this.notificationService.showErrorMessage("You can not choose a few selective disciplines simultaneously!");
        } else if (!discipline.isSelective && this.selectedDisciplines.length) {
          this.notificationService.showErrorMessage("You can not choose a few mandatory disciplines simultaneously!");
        } else {
          this.selectedDisciplines.push(discipline);
        }
      }
    }
  }

  isSelected(disciplineId: number) {
    return { 'selected-disc': this.selectedDisciplines.some(p => p.id == disciplineId) };
  }

  addItemCatalog(value: any) {
    let selective: IDiscipline[] = this.getSelectiveDisciplinesByCatalogId(value);

    let finalSelective: IDiscipline[] = [];

    this.selectedDisciplines = [];

    selective.forEach(element => {
      if (!(this.data.scheduleDisciplines?.some(o => (o.disciplineId == element.id && o.semester == this.data.semester
        && o.isLecture) && this.data.scheduleDisciplines?.some(o => (o.disciplineId == element.id && o.semester == this.data.semester
          && !o.isLecture)))))
      {
        finalSelective.push(element);
      }
    });

    this.catalogDisciplines = finalSelective;
  }

  getSelectiveDisciplinesByCatalogId(id: number) {
    const selectiveToChoose = this.data.disciplinesToChoose.filter(o => o.isSelective);

    return selectiveToChoose.filter(k => k.catalogId == id);
  }

}
