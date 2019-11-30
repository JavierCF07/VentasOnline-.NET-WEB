import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Clientes } from '../clientes/clientes';
import { ClienteCreacionDTO } from '../clientes/cliente-creacion-dto';
import { map, catchError } from 'rxjs/operators';
import { EmailCliente } from '../email-cliente/email-cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private urlEnpoint = 'https://localhost:44384/api/v1';

  constructor(private httpClient: HttpClient, private router: Router) {}

  getData(url: string) {
    /*const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});*/
    return this.httpClient.get(`${this.urlEnpoint}/${url}` /*{headers}*/);
  }

  getClient(): Observable<Clientes[]> {
    return this.httpClient.get<Clientes[]>(`${this.urlEnpoint}/clientes`);
  }

  getClientes() {
    return this.getData('clientes');
  }

  create(cliente: ClienteCreacionDTO): Observable<Clientes> {
    return this.httpClient.post(`${this.urlEnpoint}/clientes`, cliente).pipe(
      map((
        response: any) => response as Clientes),
      catchError( e => {
        if (e.status === 4000) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Clientes> {
    return this.httpClient.delete<Clientes>(`${this.urlEnpoint}/clientes/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, cliente: ClienteCreacionDTO): Observable<any> {
    return this.httpClient.put<any>(`${this.urlEnpoint}/clientes/${id}`, cliente).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getCliente(id: number): Observable<Clientes> {
    return this.httpClient.get<Clientes>(`${this.urlEnpoint}/clientes/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401) {
          this.router.navigate(['/clientes']);
        }
        return throwError(e);
      })
    );
  }
}
