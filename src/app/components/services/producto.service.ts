import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Producto } from '../productos/producto';
import { Categoria } from '../categorias/categoria';
import { TipoEmpaque } from '../tipo-empaques/tipo-empaque';
import { map, catchError } from 'rxjs/operators';
import { ProductoCreacionDTO } from '../productos/producto-creacion-dto';
/*import { CategoriaService } from './categoria-service.service';*/

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEnpoint = 'https://localhost:44384/api/v1';

  constructor(
    private httpClient: HttpClient,
    private router: Router, /*private categoriaService: CategoriaService*/) {}

  getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(`${this.urlEnpoint}/producto`);
  }

  getProductoPage(page?: number): Observable<any> {
    return this.httpClient.get(`${this.urlEnpoint}/producto/page/${page}`);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.urlEnpoint}/categoria`);
    /*return this.categoriaService.getCategorias();*/
  }

  getTipoEmpaque(): Observable<TipoEmpaque[]> {
    return this.httpClient.get<TipoEmpaque[]>(`${this.urlEnpoint}/tipoEmpaque`);
    /*return this.tipoEmpaqueService.getTipoEmpaque();*/
  }

  create(producto: ProductoCreacionDTO): Observable<Producto> {
    return this.httpClient.post(`${this.urlEnpoint}/producto`, producto).pipe(
      map((
        response: any) => response as Producto),
    catchError(e => {
      if (e.status === 400) {
        return throwError(e);
      }
      return throwError(e);
    })
    );
  }

  delete(id: number): Observable<Producto> {
    return this.httpClient.delete<Producto>(`${this.urlEnpoint}/producto/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  update(id: number, producto: ProductoCreacionDTO): Observable<any> {
    return this.httpClient.put<any>
    (`${this.urlEnpoint}/producto/${id}`, producto)
      .pipe(
        catchError(e => {
          if (e.status === 400) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
    }

    getProducto(id: number): Observable<Producto> {
      return this.httpClient.get<Producto>(`${this.urlEnpoint}/producto/${id}`)
      .pipe(
        catchError(e => {
          if (e.status !== 401) {
            this.router.navigate(['/producto']);
          }
          return throwError(e);
        })
      );
    }
  }
