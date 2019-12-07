import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Proveedores } from '../proveedores/proveedores';
import { ProveedoresCreacionDTO } from '../proveedores/proveedores-creacion-dto';
import { map, catchError } from 'rxjs/operators';
import { registerModuleFactory } from '@angular/core/src/linker/ng_module_factory_loader';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private urlEnpoint = 'https://localhost:44384/api/v1';

  constructor(
    private httpClient: HttpClient,
    private router: Router) { }

  getData(url: string) {
    /*const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});*/
    return this.httpClient.get(`${this.urlEnpoint}/${url}` /*{headers}*/);
  }

  getProveedores(): Observable<Proveedores[]> {
    return this.httpClient.get<Proveedores[]>(`${this.urlEnpoint}/proveedores`);
  }

  getProveedoresPage(page?: number): Observable<any> {
    return this.httpClient.get(`${this.urlEnpoint}/proveedores/page/${page}`);
  }

  create(proveedores: ProveedoresCreacionDTO): Observable<Proveedores> {
    return this.httpClient.post(`${this.urlEnpoint}/proveedores`, proveedores).pipe(
      map((
        response: any) => response as Proveedores),
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Proveedores> {
    return this.httpClient.delete<Proveedores>(`${this.urlEnpoint}/proveedores/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, proveedores: ProveedoresCreacionDTO): Observable<any> {
    return this.httpClient.put<any>(`${this.urlEnpoint}/proveedores/${id}`, proveedores).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getProveedor(id: number): Observable<Proveedores> {
    return this.httpClient.get<Proveedores>(`${this.urlEnpoint}/proveedores/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401) {
          this.router.navigate(['/proveedores']);
        }
        return throwError(e);
      })
    );
  }
}
