import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private API_URL = 'https://localhost:44384/api/v1';
  private token;
  constructor(private httpClient: HttpClient) { }

  getData(url: string) {
    /*const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});*/
    return this.httpClient.get(`${this.API_URL}/${url}` /*{headers}*/);
  }

  getProveedores() {
    return this.getData('Proveedores');
  }
}
