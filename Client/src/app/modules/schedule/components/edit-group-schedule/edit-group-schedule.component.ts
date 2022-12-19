import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ICatalog } from 'src/app/modules/management/models/catalog.model';
import { IDiscipline } from 'src/app/modules/management/models/discipline.model';
import { IGroup } from 'src/app/modules/management/models/group.model';
import { CatalogDisciplineService } from 'src/app/modules/management/services/catalog-discipline.service';
import { CatalogsService } from 'src/app/modules/management/services/catalogs.service';
import { FacultyService } from 'src/app/modules/management/services/faculty.service';
import { GroupsService } from 'src/app/modules/management/services/groups.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { SpecialtiesService } from 'src/app/modules/management/services/specialties.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { WindowService } from 'src/app/shared/services/window.service';
import { IDisciplinesRequest } from '../../models/disciplinesRequest.model';
import { IScheduleDiscipline } from '../../models/schedule.model';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-edit-group-schedule',
  templateUrl: './edit-group-schedule.component.html',
  styleUrls: ['./edit-group-schedule.component.css']
})
export class EditGroupScheduleComponent implements OnInit {

  groups: IGroup[] = [];

  selectedGroupId: number;

  selectedSemester: number;

  scheduleDisciplines: IScheduleDiscipline[] = [];

  selectedGroupForEdit: IGroup;

  disciplinesToAdd: IDiscipline[] = [];

  catalogs: ICatalog[] = [];

  allCatalogs: ICatalog[] = [];

  private selectedDisciplineToManage: IDiscipline = {} as IDiscipline;

  constructor(private router: Router, private groupService: GroupsService, private usersService: UsersService,
    private scheduleService: ScheduleService, private route: ActivatedRoute, private facultyService: FacultyService,
    private specialtyService: SpecialtiesService, private windowService: WindowService,
    private catalogDisciplineService: CatalogDisciplineService, private catalogService: CatalogsService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.groupService.getByEIId(this.usersService.getCurrentEIId()).subscribe(res => {
      this.groups = res;
    });

    this.selectedGroupForEdit = JSON.parse(history.state["group"]);
    this.selectedGroupId = this.selectedGroupForEdit.id;
    this.selectedSemester = JSON.parse(history.state["semester"]);

    var request: IDisciplinesRequest = { groupId: this.selectedGroupId, semester: this.selectedSemester };
    this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
      this.scheduleDisciplines = res;
    })

    this.facultyService.getById(this.selectedGroupForEdit.facultyId).subscribe(res => this.selectedGroupForEdit.faculty = res);
    this.specialtyService.getById(this.selectedGroupForEdit.specialtyId).subscribe(res => {
      this.selectedGroupForEdit.specialty = res;
      this.scheduleService.getDisciplinesToAddBySpecialtyIdAndSemester({ specialtyId: res.id,
        semester: this.selectedSemester }).subscribe(res2 => {
          this.disciplinesToAdd = res2;
        });
    });

    this.catalogDisciplineService.getDisciplinesByCatalogId(this.usersService.getCurrentEIId())
      .subscribe(res => this.catalogs = res);

    this.catalogService.getByEIId(this.usersService.getCurrentEIId())
      .subscribe(res => this.allCatalogs = res);  
  }

  redirectToGroupManagement() {
    this.router.navigateByUrl("groups/management");
  }

  addItemGroup(newItem: any) {
    if (newItem == 'Select Group') {
      this.selectedGroupId = -1;
    } else {
      this.selectedGroupId = newItem;
      var request: IDisciplinesRequest = { groupId: this.selectedGroupId, semester: this.selectedSemester };
      this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
        this.scheduleDisciplines = res;
      })
    }
  }

  addItemSemester(newItem: any) {
    this.selectedSemester = newItem;
    var request: IDisciplinesRequest = { groupId: this.selectedGroupId, semester: this.selectedSemester };
    this.scheduleService.getScheduleDisciplinesByGroupAndSemesterId(request).subscribe(res => {
      this.scheduleDisciplines = res;
    })
  }

  searchByDayAndLesson(day: number, lesson: number) {
    return this.scheduleDisciplines.filter(p => p.day == day && p.lesson == lesson);
  }

  containsSelective(day: number, lesson: number) {
    return this.searchByDayAndLesson(day, lesson).some(p => p.catalogName);
  }

  getCatalogName(day: number, lesson: number) {
    return this.searchByDayAndLesson(day, lesson)[0].catalogName;
  }

  isEmpty(day: number, lesson: number) {
    return this.searchByDayAndLesson(day, lesson).length == 0;
  }

  endOfDisc(day: number, lesson: number, i: number) {
    return this.searchByDayAndLesson(day, lesson).length == i + 1;
  }

  isEmptyDay(day: number) {
    const isEmptyDay: boolean = this.scheduleDisciplines.some(p => p.day == day);

    return { 'blured': !isEmptyDay };
  }

  notLastInCatalog(day: number, lesson: number) {

    const catalog = this.getCatalogName(day, lesson);

    var catalogId: number;

    if (catalog != null) {
      catalogId = this.allCatalogs.filter(o => o.name == catalog)[0].id;
    }

    const disciplinesOfCatalog: IDiscipline[] = this.disciplinesToAdd.filter(o => o.catalogId == catalogId);

    return !disciplinesOfCatalog.every(p => this.scheduleDisciplines.some(o => 
      (o.disciplineId == p.id && o.isLecture) && this.scheduleDisciplines.some(o => 
        (o.disciplineId == p.id && !o.isLecture))));
  }

  disciplineExists(disciplineId: number) {
    const practiceScheduleDisciplines = this.scheduleDisciplines.filter(o => !o.isLecture);
    const lectureScheduleDisciplines = this.scheduleDisciplines.filter(o => o.isLecture);

    return practiceScheduleDisciplines.some(p => p.disciplineId == disciplineId) &&
    lectureScheduleDisciplines.some(p => p.disciplineId == disciplineId);
  }

  disciplineExistsAsLecture(disciplineId: number) {
    const lectureScheduleDisciplines = this.scheduleDisciplines.filter(o => o.isLecture);

    return lectureScheduleDisciplines.some(p => p.disciplineId == disciplineId);
  }

  disciplineExistsAsPractice(disciplineId: number) {
    const practiceScheduleDisciplines = this.scheduleDisciplines.filter(o => !o.isLecture);

    return practiceScheduleDisciplines.some(p => p.disciplineId == disciplineId);
  }

  countDisciplinesToAdd(isSelective: boolean) {
    return this.disciplinesToAdd.filter(p => p.isSelective == isSelective).length;
  }

  countAddedDisciplines(isSelective: boolean) {
    const practiceScheduleDisciplines = this.scheduleDisciplines.filter(o => !o.isLecture);
    const lectureScheduleDisciplines = this.scheduleDisciplines.filter(o => o.isLecture);

    return this.disciplinesToAdd.filter(p => practiceScheduleDisciplines.some(o => o.disciplineId == p.id
      && p.isSelective == isSelective) && lectureScheduleDisciplines.some(o => o.disciplineId == p.id
        && p.isSelective == isSelective)).length;
  }

  openChooseDisciplineDialog(day: number, lesson: number, addAsCatalogDisciplines: boolean = false) {
    if (this.disciplinesToAdd.every(p => this.scheduleDisciplines.some(o => o.disciplineId == p.id && o.isLecture)
      && this.scheduleDisciplines.some(o => o.disciplineId == p.id && !o.isLecture))) {
        this.notificationService.showErrorMessage("All disciplines for group was already added in schedule!");
    }
    this.windowService.openChooseDisciplineDialog({
      buttons: [
          {
            title: "Cancel",
            onClickEvent: new EventEmitter<void>(),
          },
      ],
      title: 'Add discipline',
      group: this.selectedGroupForEdit,
      day: day,
      lesson: lesson,
      disciplinesToChoose: this.disciplinesToAdd.filter(p => !this.scheduleDisciplines.some(o => (o.disciplineId == p.id && o.isLecture)
      && (o.disciplineId == p.id && !o.isLecture))),
      semester: this.selectedSemester,
      scheduleDisciplines: this.scheduleDisciplines,
      addAsCatalogDisciplines: addAsCatalogDisciplines,
      catalogName: addAsCatalogDisciplines ? this.searchByDayAndLesson(day, lesson)[0].catalogName : ""
  });
  }

  replace(discipline: IScheduleDiscipline) {
    console.log(discipline);
    console.log("replace");
  }

  delete(discipline: IScheduleDiscipline) {
    console.log(discipline);
    this.scheduleService.delete(discipline.id).subscribe(res => {
      this.notificationService.showSuccessMessage("Discipline was successfully deleted!");
      this.router.navigateByUrl("schedule/group");
    });
  }
  /*selectDisciplineToManage(value: any, toAdd: boolean = true) {
    if (toAdd) {
      this.selectedDisciplineToManage = value;
    } else {
      this.selectedDisciplineToManage = {} as IDiscipline;
    }

    console.log(this.selectedDisciplineToManage);
  }*/

  /*onChangeGroup(value: any) {
    this.selectedGroupId = value;
  }*/
}
