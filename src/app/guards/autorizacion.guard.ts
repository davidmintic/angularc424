import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionGuard implements CanActivate {

  constructor(private enrutamiento: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    const token = localStorage.getItem('tkedufre');
    if (token) {
      return true;
    } else {
      this.enrutamiento.navigate(['/sesion/login']);
      Swal.fire({
        title: 'Error',
        text: 'No tienes autorización para acceder a este lugar',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return false;
    }
  }

}
