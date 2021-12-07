import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramasEnOfertaComponent } from './programas-en-oferta/programas-en-oferta.component';

const routes: Routes = [

  {
    path: '', component: ProgramasEnOfertaComponent
  },
  {
    path: 'programas-en-oferta',
    component: ProgramasEnOfertaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
