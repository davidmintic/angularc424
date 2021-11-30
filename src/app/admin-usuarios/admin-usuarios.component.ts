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



  crearUsuario(): void {


    // Swal.fire({
    //   title: 'Error!',
    //   text: 'Do you want to continue',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
    // })

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


}
