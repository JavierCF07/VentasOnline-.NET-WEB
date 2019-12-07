import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Compras } from '../compras/compras';
import { ComprasCreacionDTO } from '../compras/compras-creacion-dto';
import { map, catchError } from 'rxjs/operators';
import { Proveedores } from '../proveedores/proveedores';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private urlEnpoint = 'https://localhost:44384/api/v1';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getCompras(): Observable<Compras[]> {
    return this.httpClient.get<Compras[]>(`${this.urlEnpoint}/compras/`);
  }

  getComprasPage(page?: number): Observable<any> {
    return this.httpClient.get(`${this.urlEnpoint}/compras/page/${page}`);
  }

  getProveedores(): Observable<Proveedores[]> {
    return this.httpClient.get<Proveedores[]>(`${this.urlEnpoint}/proveedores`);
  }

  create(compras: ComprasCreacionDTO): Observable<Compras> {
    return this.httpClient.post(`${this.urlEnpoint}/compras`, compras).pipe(
      map((
        response: any) => response as Compras),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Compras> {
    return this.httpClient.delete<Compras>(`${this.urlEnpoint}/compras/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, compras: ComprasCreacionDTO): Observable<any> {
    return this.httpClient.put<any>(`${this.urlEnpoint}/compras/${id}`, compras).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getCompra(id: number): Observable<Compras> {
    return this.httpClient.get<Compras>(`${this.urlEnpoint}/compras/${id}`).pipe(
      catchError(e => {
        if (e.status === 401) {
          this.router.navigate(['/compras']);
        }
        return throwError(e);
      })
    );
  }
}
