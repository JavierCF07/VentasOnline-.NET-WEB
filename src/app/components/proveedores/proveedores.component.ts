import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';
import { Proveedores } from './proveedores';
import { ModalProductoService } from '../services/modal/modal-producto.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedores[] = [];
  proveedorSeleccionado: Proveedores;
  tipo: string;
  paginador: any;

  constructor(
    private proveedoresService: ProveedoresService,
    private ModalProveedorService: ModalProductoService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = + params.get('page');
      if (!page) {
        page = 0;
      }
      this.proveedoresService.getProveedoresPage(page)
        .subscribe((response: any) => {
          this.proveedores = response.content as Proveedores[];
          this.paginador = response;
        });
    });

    this.ModalProveedorService.notificarCambio.subscribe(proveedor => {
      if (this.tipo === 'new') {
        this.proveedores.push(proveedor);
      } else if (this.tipo === 'update') {
        this.proveedores = this.proveedores.map(proveedorOriginal => {
          if (proveedor.codigoProveedor === proveedorOriginal.codigoProveedor) {
            proveedorOriginal = proveedor;
          }
          return proveedorOriginal;
        });
      }
    });
  }

  delete(proveedor: Proveedores): void {
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
      reverseButtons: true
    }).then((result) => {
      this.proveedoresService.delete(proveedor.codigoProveedor).subscribe(
        () => {
          this.proveedores = this.proveedores.filter(prov => prov !== proveedor);
          Swal.fire('Producto eliminado', `Producto ${proveedor.razonSocial} eliminado correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(proveedor?: Proveedores) {
    if (proveedor) {
      this.proveedorSeleccionado = proveedor;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.proveedorSeleccionado = new Proveedores();
    }
    this.ModalProveedorService.abrirModal();
  }
}
