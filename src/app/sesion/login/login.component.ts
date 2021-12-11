import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../servicios/global.service';
import { BackendSevicioService } from '../../servicios/backend-sevicio.service';
import Swal from 'sweetalert2';

@Component(
  {
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  }
)
export class LoginComponent implements OnInit {

  tituloLogin: string = 'Login';
  codigo: string = '';
  contrasenia = '';

  // formLogin = new FormGroup({
  //   codigo: new FormControl(''),
  //   contrasenia: new FormControl(''),
  // });


  formLogin: any;

  clickLogin: boolean = false;

  toogleForm = true;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private servicioBackend: BackendSevicioService,
    private servicioGlobal: GlobalService
  ) {

    this.formLogin = fb.group({
      codigo: ['', Validators.compose([Validators.required, Validators.email])],
      contrasenia: ['', Validators.required]
    });

    this.servicioGlobal.rutaActual = 'login';

  }

  ngOnInit(): void {


    console.log('entró al ngOnInit');
  }

  ngAfterViewInit(): void {}

  autenticar(): void {

    const contraseniaEncriptada = Md5.hashStr(this.formLogin.controls['contrasenia'].value);
    this.formLogin.controls.contrasenia.setValue(contraseniaEncriptada);

    const credenciales = this.formLogin.getRawValue();

    this.servicioBackend.validUser(JSON.stringify(credenciales)).subscribe(
      (response) => {

        if (response) {

          if (response.tk) {

            Swal.fire({
              title: 'Bienvenido',
              text: 'Has iniciado sesión',
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            const perfil = response.data.perfil;

            localStorage.setItem('tkedufre', response.tk);
            localStorage.setItem('perfil', JSON.stringify(perfil));

            this.servicioGlobal.actualizarMenu(perfil.menu);
            this.servicioBackend.token = response.tk;
            this.servicioBackend.isAutenticate = true;

            this.router.navigate([perfil.rutaInicio]);

          } else {
            alert('Las credenciales son incorrectas');

          }
        } else {
          alert('Ups ocurrió un error');
        }
      },
      (error) => {
        console.log('error');

        if (error.status == 401) {

          Swal.fire({
            title: 'Datos no válidos',
            text: 'Revisa que hayas escritos bien tus datos',
            icon: 'error',
            confirmButtonText: 'Cool'
          });
        }

      },
      () => {
        console.log('se completó');
      }

    );

    // console.log('Encriptada: ' + contraseniaEncriptada);
    // this.clickLogin = true;

    // this.router.navigate(['/admin-usuario']);


  }


  setToggleForm() {
    this.toogleForm = !this.toogleForm;
  }


}
