import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  ) {


    router.events.subscribe((val) => {
      // see also 
      if(val instanceof NavigationEnd) {
          this.servicioGlobal.rutaActual = val.url;
      }
    });
  }


  routeLogin(): void {
    this.servicioBackend.cerrarSesion();
    this.router.navigate(['/sesion/login']);
  }

  routeProgramas(): void {
    this.router.navigate(['/estudiantes/programas-en-oferta']);
  }


  routeAdminUsuarios(): void {
    this.router.navigate(['/admin/admin-usuarios']);
  }

}
