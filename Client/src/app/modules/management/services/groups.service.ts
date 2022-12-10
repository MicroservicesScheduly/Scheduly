import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGroup, ISaveGroup } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private _http: HttpClient) { }

    get(): Observable<IGroup[]>{
      return this._http.get<IGroup[]>(environment.urlPrefix + environment.groupsUrl);
    }

    getById(id: number): Observable<IGroup> {
      return this._http.get<IGroup>(environment.urlPrefix + environment.groupsUrl + `/${id}`);
    }

    getByEIId(id: number): Observable<IGroup[]> {
      return this._http.get<IGroup[]>(environment.urlPrefix + environment.groupsUrl + `/byEI/${id}`);
    }

    create(group: ISaveGroup) {
      return this._http.post<IGroup>(environment.urlPrefix + environment.groupsUrl, group);
    } 

    update(id: number, group: IGroup) {
      return this._http.put<IGroup>(environment.urlPrefix + environment.groupsUrl + `/${id}`, group);
    } 

    delete(id: number) {
      return this._http.delete(environment.urlPrefix + environment.groupsUrl + `/${id}`);
    }
}