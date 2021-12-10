import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendSevicioService {

  urlBackend = "http://localhost:3000";
  token: string = '';
  isAutenticate = false;

  constructor(private http: HttpClient) {
    this.cargarToken();
  }


  cerrarSesion() {
    this.token = '';
    this.isAutenticate = false;
    localStorage.removeItem('tkedufre');
  }


  cargarToken() {
    const token = localStorage.getItem('tkedufre');
    if (token) {
      this.token = token;
      this.isAutenticate = true;
    }

  }

  getDatos(ruta: string): Observable<any> {


    return this.http.get(
      this.urlBackend + ruta,
      {
        headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${this.token}`
          }
        )
      }
    );
  }

  getDatosFiltro(ruta: string, filtro: string): Observable<any> {


    const parametroFiltro = new HttpParams().append('filter', filtro);

    return this.http.get(
      this.urlBackend + ruta,
      {
        headers: new HttpHeaders(
          {
            'Authorization': `Bearer ${this.token}`
          }
        ),
        params: parametroFiltro
      }
    );
  }


  postDatos(ruta: string, datos: string): Observable<any> {

    return this.http.post(this.urlBackend + ruta,
      datos,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        )
      }
    )
  }



  patchDatos(ruta: string, id: string, datos: string): Observable<any> {

    return this.http.patch(
      this.urlBackend + ruta + '/' + id,
      datos,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        )
      }
    )
  }


  deleteDatos(ruta: string, id: string): Observable<any> {

    return this.http.delete(
      this.urlBackend + ruta + '/' + id,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        )
      }
    )
  }


  validUser(credenciales: string): Observable<any> {

    // const url = this.urlBackend + ruta + '?filter=' + encodeURIComponent('{ "where" : ' + credenciales + "}");
    const url = this.urlBackend + '/login';
    return this.http.post(
      url,
      credenciales,
      {
        headers: new HttpHeaders(
          {
            'Content-Type': 'application/json'
          }
        )
      }
    );





    // const token = '';
    // var headersObject = new HttpHeaders({
    //   'Content-Type': 'application/json; charset=utf-8',
    //   'Authorization': "Bearer " + token
    // });

    // const httpOptions = {
    //   headers: headersObject
    // };

  }


}
