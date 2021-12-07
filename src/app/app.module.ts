import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './sesion/login/login.component';
import { ProgramasEnOfertaComponent } from './estudiantes/programas-en-oferta/programas-en-oferta.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from './servicios/global.service';
import { AdminUsuariosComponent } from './administracion/admin-usuarios/admin-usuarios.component';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { SesionModule } from './sesion/sesion.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgramasEnOfertaComponent,
    AdminUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EstudiantesModule,
    SesionModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
