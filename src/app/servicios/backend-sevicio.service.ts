import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendSevicioService {

  urlBackend = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getDatos(ruta: string): Observable<any> {
    return this.http.get(this.urlBackend + ruta);
  }


  validUser(ruta: string, credenciales: string): Observable<any> {

    // const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

    const url = this.urlBackend + ruta + '?filter=' + encodeURIComponent('{ "where" : ' + credenciales + "}");
    return this.http.get(
      url     
    );

  }


}
