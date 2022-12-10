import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISaveTeacher, ITeacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  constructor(private _http: HttpClient) { }

    get(): Observable<ITeacher[]>{
      return this._http.get<ITeacher[]>(environment.urlPrefix + environment.teachersUrl);
    }

    getById(id: number): Observable<ITeacher> {
      return this._http.get<ITeacher>(environment.urlPrefix + environment.teachersUrl + `/${id}`);
    }

    getByEIId(id: number): Observable<ITeacher[]> {
      return this._http.get<ITeacher[]>(environment.urlPrefix + environment.teachersUrl + `/byEI/${id}`);
    }

    create(teacher: ISaveTeacher) {
      return this._http.post<ITeacher>(environment.urlPrefix + environment.teachersUrl, teacher);
    } 

    update(id: number, teacher: ITeacher) {
      return this._http.put<ITeacher>(environment.urlPrefix + environment.teachersUrl + `/${id}`, teacher);
    } 

    delete(id: number) {
      return this._http.delete(environment.urlPrefix + environment.teachersUrl + `/${id}`);
    }
}
