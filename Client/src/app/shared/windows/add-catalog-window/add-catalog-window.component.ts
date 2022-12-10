import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICatalog, ISaveCatalog } from 'src/app/modules/management/models/catalog.model';
import { ITeacher } from 'src/app/modules/management/models/teacher.model';
import { CatalogsService } from 'src/app/modules/management/services/catalogs.service';
import { NotificationService } from 'src/app/modules/management/services/notification.service';
import { IDialogButton } from '../../models/IDialogButton.model';
import { IDialogData } from '../../models/IDialogData.model';

@Component({
  selector: 'app-add-catalog-window',
  templateUrl: './add-catalog-window.component.html',
  styleUrls: ['./add-catalog-window.component.css']
})
export class AddCatalogWindowComponent implements OnInit {
  
  catalogs: ICatalog[] = [];

  catalog: ICatalog = {} as ICatalog;

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IDialogData,
      private dialogRef: MatDialogRef<AddCatalogWindowComponent>,
      private catalogsService: CatalogsService,
      private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.catalogsService.get().subscribe(res => this.catalogs = res);
  }

  onClick(event: EventEmitter<void>) {
      event?.next();
      this.dialogRef.close();
  }

  addNewCatalog(form: NgForm) {
    var catalog: ISaveCatalog = { name: form.value["name"],
      universityId: JSON.parse(localStorage.getItem('selectedEI') as string) };

    this.catalogsService.create(catalog)
    .subscribe(() => {
      this.dialogRef.close();
      this.notificationService.showSuccessMessage("New catalog was added successfully");
    });

  }
}
