import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate( next: ActivatedRouteSnapshot) : boolean {
    if( sessionStorage.getItem("AUTH_TOKEN") == null){
      this.router.navigate(['/user/login']);
      return false;
  }
  else{
    return true;
  }
  }
}
