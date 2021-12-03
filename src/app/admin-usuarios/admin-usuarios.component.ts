import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../servicios/global.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendSevicioService } from '../servicios/backend-sevicio.service';


@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss']
})
export class AdminUsuariosComponent implements OnInit {


  openNewUser = false;
  formUsuario: any;
  opcionesTipoUsuaurio = [
    {
      codigo: 'Docente',
      texto: 'Docente',
    },
    {
      codigo: 'Estudiante',
      texto: 'Estudiante',
    },
    {
      codigo: 'Administrador',
      texto: 'Administrador',
    },
    {
      codigo: 'Supervisor',
      texto: 'Supervisor',
    }

  ];

  selectTipoUsuario = 'Estudiante';
  listaUsuarios: any[] = [];

  modoCrud = 'adicion';
  idActual = '';


  constructor(
    private servicioGlobal: GlobalService,
    private servicioBackend: BackendSevicioService,
    private formBuilder: FormBuilder
  ) {

    this.formUsuario = formBuilder.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.compose([Validators.required, Validators.email])],
      tipo: [''],
      contrasenia: ['xxx']
    });

    this.obtenerUsuarios();

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.servicioGlobal.rutaActual = "admin-usuarios";
    });
  }


  obtenerUsuarios(): void {
    this.servicioBackend.getDatos('/usuarios').subscribe({
      next: (datos) => {
        this.listaUsuarios = datos;
      },
      error: () => {

      },

      complete: () => {

      }

    })
  }


  iniciarCreacion(): void {
    this.openNewUser = !this.openNewUser;
    this.modoCrud = 'adicion';
  }

  crearUsuario(): void {

    const usuario = this.formUsuario.getRawValue();
    usuario.tipo = this.selectTipoUsuario;
    this.servicioBackend.postDatos('/usuarios', JSON.stringify(usuario)).subscribe(
      {
        next: (respuesta) => {
          console.log(respuesta);

          Swal.fire({
            title: 'Felicidades',
            text: 'Has creado un nuevo usuario',
            icon: 'success',
            confirmButtonText: 'Cool'
          });
          this.obtenerUsuarios();
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo agregar',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        },

        complete: () => {

        }
      }

    );

  }


  iniciarEdicion(usuario: any): void {
    this.idActual = usuario.id;
    this.formUsuario.patchValue(usuario);
    this.openNewUser = true;
    this.modoCrud = 'edicion';
  }

  editarUsuario(): void {

    const usuarioModificado = this.formUsuario.getRawValue();

    this.servicioBackend.patchDatos('/usuarios', this.idActual, usuarioModificado).subscribe(
      {
        next: (respuesta) => {
          console.log(respuesta);

          Swal.fire({
            title: 'Felicidades',
            text: 'Has editado un nuevo usuario',
            icon: 'success',
            confirmButtonText: 'Cool'
          });
          this.obtenerUsuarios();
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo editar',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        },

        complete: () => {

        }
      }
    );

  }


  eliminarUsuario(id: string) {
    
    this.servicioBackend.deleteDatos('/usuarios', id).subscribe(
      {
        next: (respuesta) => {
          console.log(respuesta);

          Swal.fire({
            title: '!!!',
            text: 'Has eliminado al usuario',
            icon: 'success',
            confirmButtonText: 'Cool'
          });
          this.obtenerUsuarios();
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: 'No se pudo eliminar',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        },

        complete: () => {

        }
      }
    );
  }


}
