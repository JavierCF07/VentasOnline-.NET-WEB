import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../categorias/categoria';
import { CategoriaCreacionDTO } from '../categorias/categoria-creacion-dto';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private API_URL = 'https://localhost:44384/api/v1';
  private token;
  constructor(private httpClient: HttpClient) { }

  getData(url: string) {
    /*const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});*/
    return this.httpClient.get<Categoria[]>(`${this.API_URL}/${url}` /*{headers}*/);
  }

  getCategorias() {
    return this.getData('Categoria');
  }

  create(categoria: CategoriaCreacionDTO): Observable<Categoria> {
    return this.httpClient.post(`${this.API_URL}/categoria`, categoria).pipe(
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
}
