import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizacionGuard } from '../guards/autorizacion.guard';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin-usuarios',
    pathMatch: 'full'
  },
  {
    path: 'admin-usuarios',
    canActivate: [AutorizacionGuard],
    component: AdminUsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
