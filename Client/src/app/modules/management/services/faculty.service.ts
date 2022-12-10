import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faculty, ISaveFaculty } from '../models/faculty.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FacultyService {
  constructor(private _http: HttpClient) { }

    get(): Observable<Faculty[]>{
      return this._http.get<Faculty[]>(environment.urlPrefix + environment.facultyUrl);
    }

    getById(id: number): Observable<Faculty> {
      return this._http.get<Faculty>(environment.urlPrefix + environment.facultyUrl + `/${id}`);
    }

    getByEIId(id: number): Observable<Faculty[]> {
      return this._http.get<Faculty[]>(environment.urlPrefix + environment.facultyUrl + `/byEI/${id}`);
    }

    create(faculty: ISaveFaculty) {
      return this._http.post<Faculty>(environment.urlPrefix + environment.facultyUrl, faculty);
    } 

    update(id: number, faculty: Faculty) {
      return this._http.put<Faculty>(environment.urlPrefix + environment.facultyUrl + `/${id}`, faculty);
    } 

    delete(id: number) {
      return this._http.delete(environment.urlPrefix + environment.facultyUrl + `/${id}`);
    }
}
