import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario: Usuario;
  private Token: string;

  constructor(private httpClient: HttpClient) { }

  public get token(): string {
    if (this.Token != null) {
      return this.Token;
    } else if (this.Token == null && sessionStorage.getItem('token') != null) {
      this.Token = sessionStorage.getItem('token');
      return this.Token;
    }
    return null;
  }

  public get Usuario(): Usuario {
    if (this.usuario != null) {
      return this.usuario;
    } else if (this.usuario == null && sessionStorage.getItem('Usuario') != null) {
      this.usuario = JSON.parse(sessionStorage.getItem('Usuario'));
      return this.Usuario;
    }
    return new Usuario();
  }

  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = 'https://localhost:44384/api/v1/cuentas/login';
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(urlEndpoint, usuario, { headers: httpHeaders });
  }

  logout(): void {
    this.Token = null;
    this.usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('Usuario');
  }

  isAuthenticated(): boolean {
    const payload = this.GetDataToken(this.token);
    if (payload != null && payload.unique_name && payload.unique_name.length > 0) {
      return true;
    }
    return false;
  }

  saveUser(token: string) {
    this.usuario = new Usuario();
    const payload = this.GetDataToken(token);
    this.usuario.email = payload.unique_name;
    sessionStorage.setItem('Usuario', JSON.stringify(this.usuario));
  }

  saveToken(token: string) {
    this.Token = token;
    sessionStorage.setItem('token', token);
  }

  GetDataToken(token: string) {
    if (token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }
}
