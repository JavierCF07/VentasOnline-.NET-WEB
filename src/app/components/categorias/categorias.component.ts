import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria-service.service';
import { CategoriaCreacionDTO } from './categoria-creacion-dto';
import { Categoria } from './categoria';
import Swal from 'sweetalert2';
import { ResourceLoader } from '@angular/compiler';
import { ModalProductoService } from '../services/modal/modal-producto.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: any[];
  categoriaSeleccionada: Categoria;
  id: number;

  constructor(private categoriaService: CategoriaService, private ModalCategoriaService: ModalProductoService) {
    this.categoriaService.getCategorias().subscribe((data: any) => {
      this.categorias = data;
    });
    }

  ngOnInit() {
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
      /*this.categoriaSeleccionada = new CategoriaCreacionDTO();
      this.categoriaSeleccionada.descripcion = categoria.descripcion;
      this.id = categoria.codigoCategoria;*/
      this.categoriaSeleccionada = categoria;
      this.ModalCategoriaService.abrirModal();
    } /*else {
      this.id = null;
    }*/
  }
}
