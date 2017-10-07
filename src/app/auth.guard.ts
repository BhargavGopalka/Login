import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot) {
    const chkToken = sessionStorage.getItem('currentUser');
    if (chkToken && (state.url !== '/' && state.url !== '/login')) {
      return true;
    } else if ((state.url === '/' || state.url === '/login') && !chkToken) {
      return true;
    } else if (chkToken && (state.url === '/' || state.url === '/login')) {
      this.router.navigate(['infoTable']);
      return false;
    }
    this.router.navigate(['login']);
    return false;
  }
}
