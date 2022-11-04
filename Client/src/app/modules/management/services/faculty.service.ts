import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faculty } from '../models/faculty.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment, HEADERS } from 'src/environments/environment';

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

    create(faculty: Faculty) {
      console.log('create method of Faculty Service');
      return this._http.post<Faculty>(environment.urlPrefix + environment.facultyUrl, faculty);

      /*const body = JSON.stringify(faculty);

      return this._http.post<Faculty>(environment.urlPrefix + environment.facultyUrl, body, {"headers": HEADERS});*/
  }
}
