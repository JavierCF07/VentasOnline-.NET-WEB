import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailClienteCreacionDTO } from '../email-cliente/email-cliente-creacion-dto';
import { Observable, throwError } from 'rxjs';
import { EmailCliente } from '../email-cliente/email-cliente';
import { map, catchError } from 'rxjs/operators';
import { Clientes } from '../clientes/clientes';

@Injectable({
  providedIn: 'root'
})
export class EmailClienteService {

  private urlEnpoint = 'https://localhost:44384/api/v1';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getClientes(): Observable<Clientes[]> {
    return this.httpClient.get<Clientes[]>(`${this.urlEnpoint}/emailClientes`);
  }

  getEmailClientes(): Observable<EmailCliente[]> {
    return this.httpClient.get<EmailCliente[]>(`${this.urlEnpoint}/clientes`);
  }

  create(emailCliente: EmailClienteCreacionDTO): Observable<EmailCliente> {
    return this.httpClient.post(`${this.urlEnpoint}/emaiClientes`, emailCliente).pipe(
      map((
        response: any) => response as EmailCliente),
      catchError(e => {
        if (e.status === 4000) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<EmailCliente> {
    return this.httpClient.delete<EmailCliente>(`${this.urlEnpoint}/emailClientes/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, emailCliente: EmailClienteCreacionDTO): Observable<any> {
    return this.httpClient.put<any>(`${this.urlEnpoint}/emailClientes/${id}`, emailCliente).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getEmailCliente(id: number): Observable<EmailCliente> {
    return this.httpClient.get<EmailCliente>(`${this.urlEnpoint}/emailClientes/${id}`).pipe(
      catchError(e => {
        if (e.status === 401) {
          this.router.navigate(['/emailClientes']);
        }
        return throwError(e);
      })
    );
  }
}
