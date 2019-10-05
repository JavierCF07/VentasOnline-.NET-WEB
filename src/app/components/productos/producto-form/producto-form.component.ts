import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { TipoEmpaque } from '../../tipo-empaques/tipo-empaque';
import { CategoriaService } from '../../services/categoria-service.service';
import { TipoEmpaqueService } from '../../services/tipo-empaque.service';
import { ProductoService } from '../../services/producto.service';
import { Categoria } from '../../categorias/categoria';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  titulo: string;
  producto: Producto = new Producto();
  categorias: Categoria[];
  tipoEmpaques: TipoEmpaque[];

  constructor(
    private categoriaService: CategoriaService,
    private tipoEmpaqueService: TipoEmpaqueService,
    private productoService: ProductoService,
    private router: Router) {this.titulo = 'Agregar Producto';
}



  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(categoria => this.categorias = categoria);
    this.tipoEmpaqueService.getTipoEmpaque().subscribe(tipoEmpaque => this.tipoEmpaques = tipoEmpaque);
  }

  create(): void {
    this.productoService.create(this.producto).subscribe(
      producto => {
        this.router.navigate(['/producto']);
        Swal.fire('Nuevo producto', `El producto ${this.producto.descripcion} ha sido creado con 'éxito`,
        'success');
      },
      error => {
        Swal.fire('Nuevo producto', `Error code ${error.status}`, 'error');
      }
    );
  }
}
