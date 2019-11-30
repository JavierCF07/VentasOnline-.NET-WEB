import { Component, OnInit, Input } from '@angular/core';
import { CategoriaCreacionDTO } from '../categoria-creacion-dto';
import { CategoriaService } from '../../services/categoria-service.service';
import { Router } from '@angular/router';
import { ModalProductoService } from '../../services/modal/modal-producto.service';
import { Categoria } from '../categoria';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  titulo: string;
  mensaje: string;
  @Input() categoria: Categoria;

  categorias: Categoria[];

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private modalCategoriaService: ModalProductoService,
  ) {this.titulo = 'Agregar Categoria'; }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(categoria => this.categorias = categoria as Categoria[]);
  }

  create(): void {
    const nuevo = new CategoriaCreacionDTO();
    nuevo.descripcion = this.categoria.descripcion;
    this.categoriaService.create(nuevo).subscribe(
      categoria => {
        Swal.fire('Nueva categoria', `La categoria ${this.categoria.descripcion} ha sido creado con exito`,
        'success');
        this.modalCategoriaService.notificarCambio.emit(categoria);
        this.modalCategoriaService.cerrarModal();
        this.router.navigate(['/categorias']);
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
    this.categoriaService.update(this.categoria.codigoCategoria, nuevo).subscribe(
      () => {
        Swal.fire('Actualizar categoria', `La categoria ${nuevo.descripcion} ha sido actualizada correctamente`, 'success');
        this.modalCategoriaService.notificarCambio.emit(this.categoria);
        this.modalCategoriaService.cerrarModal();
        this.router.navigate(['/categorias']);
      }
    );
  }

  cerrarModal(): void {
    this.modalCategoriaService.cerrarModal();
  }
}
