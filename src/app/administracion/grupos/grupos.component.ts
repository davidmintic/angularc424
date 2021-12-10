import { Component, OnInit } from '@angular/core';
import { BackendSevicioService } from 'src/app/servicios/backend-sevicio.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {


  listaGrupos: any[] = [];
  listaUsuarios: any[] = [];
  listaCalificaciones: any[] = [];
  templateActual = 'grupos';
  grupoActual: any;
  usuarioctual: any;
  migaPan = '';

  constructor(private servicioBackend: BackendSevicioService) {
    this.obtenerGrupos();

  }

  ngOnInit(): void {
  }


  obtenerGrupos(): void {


    const filtro = { "include": [{ "relation": "usuarios" }] };

    this.servicioBackend.getDatosFiltro('/grupos', JSON.stringify(filtro)).subscribe({
      next: (datos) => {
        this.listaGrupos = datos;
      },
      error: () => {

      },

      complete: () => {

      }

    })
  }

  obtenerCalificacionesPorUsuario(grupoId: string, usuarioId: string): void {


    const filtro = { "where": { "grupoId": grupoId, "usuarioId": usuarioId } };

    this.servicioBackend.getDatosFiltro('/usuario-por-grupos', JSON.stringify(filtro)).subscribe({
      next: (datos) => {
        if (datos && datos[0] && datos[0].calificaciones) {
          this.listaCalificaciones = datos[0].calificaciones;
        }
      },
      error: () => {

      },

      complete: () => {

      }

    })
  }


  verEstudiantes(grupo: any): void {

    this.grupoActual = grupo;
    this.migaPan = grupo.nombre;
    this.listaUsuarios = grupo.usuarios;
    this.templateActual = 'usuariosgrupo';

  }


  verCalificaciones(usuario: any): void {

    this.migaPan = this.grupoActual.nombre + '/' + usuario.nombre;
    this.obtenerCalificacionesPorUsuario(this.grupoActual.id, usuario.id);
    this.templateActual = 'calificaciones';

  }

  volverTemplate(): void {

    if (this.templateActual == 'usuariosgrupo') {
      this.templateActual = 'grupos';
      this.migaPan = '';
    } else if (this.templateActual == 'calificaciones') {
      this.templateActual = 'usuariosgrupo';
    }

  }

}
