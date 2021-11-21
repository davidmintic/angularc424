import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
    ){
    const ruta = this.servicioGlobal.rutaActual;
  }


  routeLogin(): void{
    this.router.navigate(['/login']);
  }

  routeProgramas(): void{
    this.router.navigate(['/programas-en-oferta']);
  }

}
