import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatalog } from '../models/catalog.model';
import { ICatalogDiscipline, ISaveCatalogDiscipline } from '../models/catalogDiscipline.model';
import { IDiscipline } from '../models/discipline.model';
import { IDisciplineTeacher, ISaveDisciplineTeacher } from '../models/disciplineTeacher.model';
import { IFacultySpecialty, ISaveFacultySpecialty } from '../models/facultySpecialty.model';
import { ISpecialty } from '../models/specialty.model';
import { ITeacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class FacultySpecialtyService {
  constructor(private _http: HttpClient) { }

    get():  Observable<IFacultySpecialty[]>{
      return this._http.get<IFacultySpecialty[]>(environment.urlPrefix + environment.facultySpecialtyUrl);
    }

    getSpecialtiesByFacultyId(id: number): Observable<ISpecialty[]>{
      return this._http.get<ISpecialty[]>(environment.urlPrefix + environment.facultySpecialtyUrl + `/${id}`);
    }

    create(facultySpecialty: ISaveFacultySpecialty) {
      return this._http.post<IFacultySpecialty>(environment.urlPrefix + environment.facultySpecialtyUrl, facultySpecialty);
    } 
}
