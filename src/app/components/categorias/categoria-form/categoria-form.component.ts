import { Component, OnInit, Input } from '@angular/core';
import { CategoriaCreacionDTO } from '../categoria-creacion-dto';
import { CategoriaService } from '../../services/categoria-service.service';
import { Router } from '@angular/router';
import { ModalProductoService } from '../../services/modal/modal-producto.service';
import { Categoria } from '../categoria';
import Swal from 'sweetalert2';
import { ProductoCreacionDTO } from '../../productos/producto-creacion-dto';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  titulo: string;
  mensaje: string;
  @Input() categoria: Categoria;
  @Input() id: number;
  categorias: Categoria[];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private modalCategoriaService: ModalProductoService,
  ) {this.titulo = 'Agregar Categoria'; }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(categoria => this.categorias = categoria);
    /*if (!this.id) {
      this.categoria = new CategoriaCreacionDTO();
    }*/
  }

  create(): void {
    this.categoriaService.create(this.categoria).subscribe(
      producto => {
        this.router.navigate(['/categorias']);
        Swal.fire('Nueva categoria', `La categoria ${this.categoria.descripcion} ha sido creado con exito`,
        'success');
        this.modalCategoriaService.cerrarModal();
      },
      error => {
        this.mensaje = 'The description field is required';
        if (this.mensaje) {
          Swal.fire('Nueva categoria', 'No puede dejar los campos vacios', 'error');
        }
      }
    );
  }
  update(): void {
    const nuevo = new CategoriaCreacionDTO();
    nuevo.descripcion = this.categoria.descripcion;
    this.categoriaService.update(this.categoria.codigoCategoria, this.categoria).subscribe(
      categoria => {
        this.router.navigate(['/categorias']);
        Swal.fire('Actualizar categoria', `La categoria ${this.categoria.descripcion} ha sido actualizada correctamente`, 'success');
        this.modalCategoriaService.cerrarModal();
        this.categoria = null;
      }
    );
  }

  cerrarModal(): void {
    this.modalCategoriaService.cerrarModal();
    console.log(this.id);
  }
}
