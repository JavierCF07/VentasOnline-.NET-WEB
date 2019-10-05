import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TipoEmpaque } from '../tipo-empaques/tipo-empaque';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpaqueService {
  private API_URL = 'https://localhost:44384/api/v1';
  private token;

  constructor(private httpClient: HttpClient) { }

  getData(url: string) {
    /*const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});*/
    return this.httpClient.get<TipoEmpaque[]>(`${this.API_URL}/${url}`/*{headers}*/);
  }
  getTipoEmpaque() {
    return this.getData('TipoEmpaque');
  }
}
