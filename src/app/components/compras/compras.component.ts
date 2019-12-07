import { Component, OnInit } from '@angular/core';
import { Compras } from './compras';
import { ComprasService } from '../services/compras.service';
import { ModalProductoService } from '../services/modal/modal-producto.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html'
})
export class ComprasComponent implements OnInit {
  compras: Compras[] = [];
  compraSeleccionada: Compras;
  tipo: string;
  paginador: any;

  constructor(
    private comprasService: ComprasService,
    private ModalCompraService: ModalProductoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = + params.get('page');
      if (!page) {
        page = 0;
      }
      this.comprasService.getComprasPage(page).subscribe((
        response: any) => {
        this.compras = response.content as Compras[];
        this.paginador = response;
      });
    });

    this.ModalCompraService.notificarCambio.subscribe(compra => {
      if (this.tipo === 'new') {
        this.compras.push(compra);
      } else if (this.tipo === 'update') {
        this.compras = this.compras.map(compraOriginal => {
          if (compra.idCompra === compraOriginal.idCompra) {
            compraOriginal = compra;
          }
          return compraOriginal;
        });
      }
    });
  }

  delete(compras: Compras): void {
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
      this.comprasService.delete(compras.idCompra).subscribe(
        () => {
          this.compras = this.compras.filter(com => com !== compras);
          Swal.fire('Compra eliminado', `Compra ${compras.numeroDocumento} eliminado correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(compra?: Compras) {
    if (compra) {
      this.compraSeleccionada = compra;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.compraSeleccionada = new Compras();
    }
    this.ModalCompraService.abrirModal();
  }
}
