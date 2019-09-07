import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../services/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: Usuario;

  constructor(private auth: AuthService) {
    this.usuario = new Usuario();
    
   }

  ngOnInit() {
  }

  login() : void{
    console.log(this.usuario);
  }
}
