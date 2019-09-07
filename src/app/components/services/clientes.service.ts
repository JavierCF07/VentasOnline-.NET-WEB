import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private API_URL = 'https://localhost:44384/api/v1';
  private token = ''
  constructor(private _HttpClient: HttpClient) {}
  
  getData(url: string){
    const headers = new HttpHeaders({'Authorization': `Bearer ${this.token}`});
    return this._HttpClient.get(`${this.API_URL}/${url}`, {headers});    
  }

  getClientes(){
    return this.getData('Clientes');
  }
}
