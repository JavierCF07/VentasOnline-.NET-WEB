import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from './producto';
import Swal from 'sweetalert2';
import { ModalProductoService } from '../services/modal/modal-producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[];
  productoSeleccionado: Producto;
  constructor(private productoService: ProductoService, private ModalProductService: ModalProductoService) {
    this.productoService.getProductos().subscribe((data: any) => {
      this.productos = data;
    });
   }

  ngOnInit() {

  }

  delete(producto: Producto): void {
    Swal.fire({
      title: 'Eliminar registro',
      text: 'Está seguro de eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true}).then((result) => {
        this.productoService.delete(producto.codigoProducto).subscribe(
          () => {
            this.productos = this.productos.filter(prod => prod !== producto);
            Swal.fire('Producto eliminado', `Producto ${producto.descripcion} eliminado correctamente`, 'success');
          }
        );
      });
    }

    abrirModal(producto: Producto) {
      this.productoSeleccionado = producto;
      this.ModalProductService.abrirModal();
    }
  }
