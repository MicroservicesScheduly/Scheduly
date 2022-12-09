import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../shared/services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public accountService: UsersService, public router: Router){}

  canActivate():boolean {
    if(!this.accountService.isAuthenticated()){
      this.router.navigate(['/']);
    }

    return true;
  }

}