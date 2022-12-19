import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { JwtHelperService } from '@auth0/angular-jwt/lib/jwthelper.service';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { Token } from '../models/token.model';
import { UserToken } from '../models/user-token.model';
import { environment } from 'src/environments/environment';
import { Registration } from '../models/registration.model';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EI, SaveEI, SaveUserEI } from '../models/EI.model';

export const ACCESS_TOKEN = 'jwt acces token';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  user: UserToken;
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
    )
    {
      this.user = this.getUser(localStorage.getItem(ACCESS_TOKEN)!);
    }

    login(email: string, password: string): Observable<Token>{
      return this.http.post<Token>(environment.urlPrefix + environment.usersUrl + '/login',{
        Email: email, Password: password
      }, this.options).pipe(
        tap(token => {
          console.log(token);
          localStorage.setItem(ACCESS_TOKEN, token.access_token);
          localStorage.setItem('id', token.id);
          localStorage.setItem('userEIs', JSON.stringify(token.eis));
          localStorage.setItem('selectedEI', JSON.stringify(token.eis[0].id));
          this.user = this.getUser(token.access_token)
        })
      )
    }

    currentUser(): UserToken{
      return this.user;
    }

    getToken(): string {
      var token = localStorage.getItem(ACCESS_TOKEN);
      if(token === null){
        return ''
      }
      return token;
    }

    getUserRole(): string{
      return this.user.role;
    }

    isAuthenticated(): boolean{
      var token = localStorage.getItem(ACCESS_TOKEN);
      
      /*if(token !== null && !this.jwtHelper.isTokenExpired(token)){
        return true;
      }*/

      if(token !== null){
        return true;
      }
      this.user = new UserToken(0,'','');
      return false;
    }

    register(registerModel: Registration): Observable<number>{
      return this.http.post<number>(environment.urlPrefix + environment.usersUrl, registerModel);
    }

    createEI(ei: SaveEI): Observable<EI> {
      return this.http.post<EI>(environment.urlPrefix + environment.usersUrl + '/ei', ei);
    }

    getEI(): Observable<EI[]> {
      return this.http.get<EI[]>(environment.urlPrefix + environment.usersUrl + '/ei');
    }

    eiNameIsUnique(eiName: string): Observable<boolean> {
      return this.http.get<boolean>(environment.urlPrefix + environment.usersUrl + `/ei/${eiName}`);
    } 

    getEILinkById(eiId: number): Observable<EI> {
      return this.http.get<EI>(environment.urlPrefix + environment.usersUrl + `/eiById/${eiId}`);
    }

    createUserEI(ei: SaveUserEI){
      return this.http.post(environment.urlPrefix + environment.usersUrl + '/userEi', ei);
    }

    getById(id: number): Observable<User>{
      return this.http.get<User>(environment.urlPrefix + environment.usersUrl + `/${id}`, this.options);
    }

    get(): Observable<User[]>{
      return this.http.get<User[]>(environment.urlPrefix + environment.usersUrl, this.options)
    }

    getByRole(id:number){
      return this.http.get<User[]>(environment.urlPrefix + environment.usersUrl + `/${id}`, this.options)
    }

    getRoles():Observable<Role[]>{
      return this.http.get<Role[]>(environment.urlPrefix + environment.usersUrl + `roles`, this.options)
    }

    changeRole(userId: number, roleId: number): Observable<any>{
      return this.http.put(environment.urlPrefix + environment.usersUrl + `${userId}/role/${roleId}`, this.options)
    }

    deleteUser(userId: number): Observable<any>{
      return this.http.delete(environment.urlPrefix + environment.usersUrl + `${userId}`);
    }

    logout():void {
      localStorage.removeItem(ACCESS_TOKEN);
      this.user = this.getUser(localStorage.getItem(ACCESS_TOKEN)!);
      this.router.navigate(['/']);
    }

    getCurrentEIId(): number {
      return JSON.parse(localStorage.getItem('selectedEI') as string);
    }

    private getUser(token:string): UserToken{
      if(token === null){
        return new UserToken(0,'','');
      }

      let user = this.jwtHelper?.decodeToken(token);
      let userToken = new UserToken(
        Number(user.id), 
        user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"], 
        user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      return userToken;
    }
}