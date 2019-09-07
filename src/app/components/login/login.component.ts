import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../services/usuario';
import swal from 'sweetalert2';


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

  login(): void {
    console.log(this.usuario);
    this.auth.login(this.usuario).subscribe(
      response => {
        this.auth.saveToken(response.token);
        this.auth.saveUser(response.token);
        swal.fire('Login', 'Bienvenido', 'success');
      }, error => {
        console.log(error);
      }
    );
  }
}
