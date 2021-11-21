import { Component, OnInit } from '@angular/core';
import { BackendSevicioService } from '../servicios/backend-sevicio.service';
import { GlobalService } from '../servicios/global.service';

interface Programa {
  imagen: string,
  nombre: string,
  descripcion: string,
  tipo: string
}

@Component({
  selector: 'app-programas-en-oferta',
  templateUrl: './programas-en-oferta.component.html',
  styleUrls: ['./programas-en-oferta.component.scss']
})
export class ProgramasEnOfertaComponent implements OnInit {


  listaProgramasEnOferta: Programa[] = [];


  constructor(
    private servicioBackend: BackendSevicioService,
    private servicioGlobal: GlobalService
    ) {
    this.getInformacionProgramas();
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.servicioGlobal.rutaActual = "programas-en-oferta";
    });
  }

  public getInformacionProgramas() {

    this.servicioBackend.getDatos('/programa-academicos').subscribe(
        (response) => {
          this.listaProgramasEnOferta = response;
          console.log('response received')
        },
        (error) => {
          console.error('Request failed with error')
        },

        () => {
          console.error('Request completed')
        }
        
        );
  }



  ngOnDestroy() {
    console.log('Se acaba de destruir el componente programas-en-oferta');
  }




}
