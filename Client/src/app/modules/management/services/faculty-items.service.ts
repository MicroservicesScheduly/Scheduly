import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatalog } from '../models/catalog.model';
import { ICatalogDiscipline, ISaveCatalogDiscipline } from '../models/catalogDiscipline.model';
import { IDiscipline } from '../models/discipline.model';
import { IDisciplineTeacher, ISaveDisciplineTeacher } from '../models/disciplineTeacher.model';
import { ISpecialty } from '../models/specialty.model';
import { ITeacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class FacultyItemsService {
  constructor(private _http: HttpClient) { }

    getTeachersByFacultyId(facultyId: number): Observable<ITeacher[]>{
      return this._http.get<ITeacher[]>(environment.urlPrefix + environment.facultyTeacherUrl + `/${facultyId}`);
    }

    getDisciplinesByFacultyId(facultyId: number): Observable<IDiscipline[]>{
        return this._http.get<IDiscipline[]>(environment.urlPrefix + environment.facultyDisciplineUrl + `/${facultyId}`);
    }

    getSpecialtiesByFacultyId(facultyId: number): Observable<ISpecialty[]>{
        return this._http.get<ISpecialty[]>(environment.urlPrefix + environment.facultySpecialtyUrl + `/${facultyId}`);
    }
}
