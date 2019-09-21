import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from '../productos/producto';
import { Categoria } from '../categorias/categoria';
import { TipoEmpaque } from '../tipo-empaques/tipo-empaque';
//import { CategoriaService } from './categoria-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEnpoint = 'https://localhost:44384/api/v1';

  constructor(private httpClient: HttpClient, private router: Router, /*private categoriaService: CategoriaService*/) {}

  getProductos(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.urlEnpoint}/producto`);
  }

  getCategorias(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${this.urlEnpoint}/categoria`);
    //return this.categoriaService.getCategorias();
  }
  
  getTipoEmpaque(): Observable<TipoEmpaque[]>{
    return this.httpClient.get<TipoEmpaque[]>(`${this.urlEnpoint}/tipoEmpaque`);
    //return this.tipoEmpaqueService.getTipoEmpaque();
  }
  
}
