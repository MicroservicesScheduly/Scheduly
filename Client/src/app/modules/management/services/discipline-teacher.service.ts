import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatalog } from '../models/catalog.model';
import { ICatalogDiscipline, ISaveCatalogDiscipline } from '../models/catalogDiscipline.model';
import { IDiscipline } from '../models/discipline.model';
import { IDisciplineTeacher, ISaveDisciplineTeacher } from '../models/disciplineTeacher.model';
import { ITeacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplineTeacherService {
  constructor(private _http: HttpClient) { }

    get(): Observable<IDisciplineTeacher[]>{
      return this._http.get<IDisciplineTeacher[]>(environment.urlPrefix + environment.disciplineTeachersUrl);
    }

    getTeachersByDisciplineId(id: number): Observable<ITeacher[]>{
      return this._http.get<ITeacher[]>(environment.urlPrefix + environment.disciplineTeachersUrl + `/${id}`);
    }

    getLecturersByDisciplineId(id: number): Observable<ITeacher[]>{
      return this._http.get<ITeacher[]>(environment.urlPrefix + environment.disciplineTeachersUrl + `Lecturers/${id}`);
    }

    getPracticiansByDisciplineId(id: number): Observable<ITeacher[]>{
      return this._http.get<ITeacher[]>(environment.urlPrefix + environment.disciplineTeachersUrl + `Practicians/${id}`);
    }

    create(disciplineTeacher: ISaveDisciplineTeacher) {
      return this._http.post<IDisciplineTeacher>(environment.urlPrefix + environment.disciplineTeachersUrl, disciplineTeacher);
    } 
}
