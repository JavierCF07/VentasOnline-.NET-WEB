import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuario: Usuario;
  private _token: string;
  
  constructor(private _httpClient: HttpClient) { }

  login(usuario: Usuario): Observable<any>{
    const urlEndpoint = 'https://localhost:44384/api/v1/cuentas/login';
    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this._httpClient.post(urlEndpoint,usuario,{headers:httpHeaders});
    return null;
  }
}
