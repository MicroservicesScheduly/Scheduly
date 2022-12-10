import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatalog, ISaveCatalog } from '../models/catalog.model';
import { IDiscipline } from '../models/discipline.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {
  constructor(private _http: HttpClient) { }

    get(): Observable<ICatalog[]>{
      return this._http.get<ICatalog[]>(environment.urlPrefix + environment.catalogsUrl);
    }

    getByEIId(id: number): Observable<ICatalog[]> {
      return this._http.get<ICatalog[]>(environment.urlPrefix + environment.catalogsUrl + `/byEI/${id}`);
    }

    create(catalog: ISaveCatalog) {
      return this._http.post<ICatalog>(environment.urlPrefix + environment.catalogsUrl, catalog);
    } 

    getById(id: number): Observable<ICatalog> {
      return this._http.get<ICatalog>(environment.urlPrefix + environment.catalogsUrl + `/${id}`);
    }

}
