import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Faculty } from '../models/faculty.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  constructor(private _http: HttpClient) { }

    get(): Observable<Faculty[]>{
      return this._http.get<Faculty[]>(environment.urlPrefix + environment.facultyUrl);
    }
}
