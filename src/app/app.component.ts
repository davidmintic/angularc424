import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendSevicioService } from './servicios/backend-sevicio.service';
import { GlobalService } from './servicios/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-edufree-g24';

  constructor(
    public servicioGlobal: GlobalService,
    public servicioBackend: BackendSevicioService,
    private router: Router
    ){
    const ruta = this.servicioGlobal.rutaActual;
  }


  routeLogin(): void{
    this.servicioBackend.cerrarSesion();
    this.router.navigate(['/sesion/login']);
  }

  routeProgramas(): void{
    this.router.navigate(['/estudiantes/programas-en-oferta']);
  }


  routeAdminUsuarios(): void{
    this.router.navigate(['/admin/admin-usuarios']);
  }

}
