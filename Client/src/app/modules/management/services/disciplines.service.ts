import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiscipline } from '../models/discipline.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinesService {
  constructor(private _http: HttpClient) { }

    get(): Observable<IDiscipline[]>{
      return this._http.get<IDiscipline[]>(environment.urlPrefix + environment.disciplinesUrl);
    }

    getById(id: number): Observable<IDiscipline> {
      return this._http.get<IDiscipline>(environment.urlPrefix + environment.disciplinesUrl + `/${id}`);
    }
}
