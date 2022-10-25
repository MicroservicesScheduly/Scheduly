import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from '../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  constructor(private _http: HttpClient) { }

    get(): Observable<Teacher[]>{
      return this._http.get<Teacher[]>(environment.urlPrefix + environment.teachersUrl);
    }
}
