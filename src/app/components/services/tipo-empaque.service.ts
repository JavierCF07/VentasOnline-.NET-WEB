import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoEmpaque } from '../tipo-empaques/tipo-empaque';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';
import { TipoEmpaqueCreacionDTO } from '../tipo-empaques/tipo-empaque-creacion-dto';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpaqueService {
  private urlEnpoint = 'https://localhost:44384/api/v1';
  private token;

  constructor(private httpClient: HttpClient, private router: Router) { }

  getData(url: string) {
    /*const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});*/
    return this.httpClient.get<TipoEmpaque[]>(`${this.urlEnpoint}/${url}`/*{headers}*/);
  }

  getTipoEmpaques(): Observable<TipoEmpaque[]> {
    return this.httpClient.get<TipoEmpaque[]>(`${this.urlEnpoint}/tipoEmpaque`);
  }
  getTipoEmpaque() {
    return this.getData('TipoEmpaque');
  }

  create(tipoEmpaque: TipoEmpaqueCreacionDTO): Observable<TipoEmpaque> {
    return this.httpClient.post(`${this.urlEnpoint}/tipoEmpaque`, tipoEmpaque).pipe(
      map((
        response: any) => response as TipoEmpaque),
        catchError(e => {
          if (e.status === 4000) {
            return throwError(e);
          }
          return throwError(e);
        })
    );
  }

  delete(id: number): Observable<TipoEmpaque> {
    return this.httpClient.delete<TipoEmpaque>(`${this.urlEnpoint}/tipoEmpaque/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, tipoEmpaque: TipoEmpaqueCreacionDTO): Observable<any> {
    return this.httpClient.put<any>(`${this.urlEnpoint}/tipoEmpaque/${id}`, tipoEmpaque).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getTipo(id: number): Observable<TipoEmpaque> {
    return this.httpClient.get<TipoEmpaque>(`${this.urlEnpoint}/tipoEmpaque/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401) {
          this.router.navigate(['/tipoEmpaque']);
        }
        return throwError(e);
      })
    );
  }
}
