import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria-service.service';
import { Categoria } from './categoria';
import Swal from 'sweetalert2';
import { ModalProductoService } from '../services/modal/modal-producto.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria;
  tipo: string;
  paginador: any;

  constructor(private categoriaService: CategoriaService, private ModalCategoriaService: ModalProductoService) {
    this.categoriaService.getCategorias().subscribe((response: any) => {
      this.categorias = response.content as Categoria[];
      this.paginador = response;
    });
    }

  ngOnInit() {
    this.ModalCategoriaService.notificarCambio.subscribe(categoria => {
      if (this.tipo === 'new') {
        this.categorias.push(categoria);
      } else if (this.tipo === 'update') {
        this.categorias = this.categorias.map(categoriaOriginal => {
          if (categoria.codigoCategoria === categoriaOriginal.codigoCategoria) {
            categoriaOriginal = categoria;
          }
          return categoriaOriginal;
        });
      }
    });
  }

  delete(categoria: Categoria): void {
    Swal.fire({
      title: 'Eliminar registro',
      text: 'Esta seguro de eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      this.categoriaService.delete(categoria.codigoCategoria).subscribe(
        () => {
          this.categorias = this.categorias.filter(cat => cat !== categoria);
          Swal.fire('Categoria eliminada', `Categoria ${categoria.descripcion} eliminada correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(categoria?: Categoria) {
    if (categoria) {
      this.categoriaSeleccionada = categoria;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.categoriaSeleccionada = new Categoria();
    }
    this.ModalCategoriaService.abrirModal();
  }
}
