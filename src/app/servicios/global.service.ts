import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  rutaActual: any;

  nombrePerfil = '';
  nombreUsuario = '';
  menu: any[] = []

  constructor() { 

    const perfil: any = localStorage.getItem('perfil');
    if(perfil) {
      const perfilJson = JSON.parse(perfil);
      this.actualizarMenu(perfilJson.menu);
    }
  }

  actualizarMenu(menu: any[]): void {
    this.menu = menu;
  }

}
