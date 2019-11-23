import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../categorias/categoria';
import { CategoriaCreacionDTO } from '../categorias/categoria-creacion-dto';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private urlEnpoint = 'https://localhost:44384/api/v1';

  constructor(private httpClient: HttpClient, private router: Router) { }

  getData(url: string) {
    /*const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});*/
    return this.httpClient.get(`${this.urlEnpoint}/${url}` /*{headers}*/);
  }
  getCategory(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.urlEnpoint}/categoria`);
  }

  getCategorias() {
    return this.getData('categoria');
  }

  create(categoria: CategoriaCreacionDTO): Observable<Categoria> {
    return this.httpClient.post(`${this.urlEnpoint}/categoria`, categoria).pipe(
      map((
        response: any) => response as Categoria),
      catchError( e => {
          if (e.status === 4000) {
            return throwError(e);
          }
          return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Categoria> {
    return this.httpClient.delete<Categoria>(`${this.urlEnpoint}/categoria/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, categoria: CategoriaCreacionDTO): Observable<any> {
    return this.httpClient.put<any>(`${this.urlEnpoint}/categoria/${id}`, categoria).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  getCategoria(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(`${this.urlEnpoint}/categoria/${id}`).pipe(
      catchError(e => {
        if (e.status !== 401) {
          this.router.navigate(['/categoria']);
        }
        return throwError(e);
      })
    );
  }
}
