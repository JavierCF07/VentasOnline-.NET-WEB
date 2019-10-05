import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria } from '../categorias/categoria';


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
}
