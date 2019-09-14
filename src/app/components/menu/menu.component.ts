import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout():void{
    const username = this.authService.usuario.email;
    this.authService.logout();
    Swal.fire('Logout',`Hola ${username}, has cerrado sesión con éxito!`,'success');
    this.router.navigate(['/login']);
  }
}
