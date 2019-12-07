import { Component, OnInit } from '@angular/core';
import { TipoEmpaqueService } from '../services/tipo-empaque.service';
import { TipoEmpaque } from './tipo-empaque';
import { ModalProductoService } from '../services/modal/modal-producto.service';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-empaques',
  templateUrl: './tipo-empaques.component.html',
  styleUrls: ['./tipo-empaques.component.css']
})
export class TipoEmpaquesComponent implements OnInit {
  tipoEmpaque: TipoEmpaque[] = [];
  tipoEmpaqueSeleccionado: TipoEmpaque;
  tipo: string;
  paginador: any;

  constructor(
    private tipoEmpaqueService: TipoEmpaqueService,
    private ModalTipoEmpaqueService: ModalProductoService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = + params.get('page');
      if (!page) {
        page = 0;
      }
      this.tipoEmpaqueService.getTipoEmpaquePage(page)
      .subscribe((response => {
        this.tipoEmpaque = response.content as TipoEmpaque[];
        this.paginador = response;
      }));
    });

    this.ModalTipoEmpaqueService.notificarCambio.subscribe(tipoEmpaque => {
      if (this.tipo === 'new') {
        this.tipoEmpaque.push(tipoEmpaque);
      } else if (this.tipo === 'update') {
        this.tipoEmpaque = this.tipoEmpaque.map(tipoEmpaqueOriginal => {
          if (tipoEmpaque.codigoEmpaque === tipoEmpaqueOriginal.codigoEmpaque) {
            tipoEmpaqueOriginal = tipoEmpaque;
          }
          return tipoEmpaqueOriginal;
        });
      }
    });
  }
  delete(tipoEmpaque: TipoEmpaque): void {
    Swal.fire({
      title: 'Eliminar registro',
      text: 'Esta seguro de eliminar el registro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '3085D6',
      cancelButtonColor: '#D33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      this.tipoEmpaqueService.delete(tipoEmpaque.codigoEmpaque).subscribe(
        () => {
          this.tipoEmpaque = this.tipoEmpaque.filter(tipo => tipo !== tipoEmpaque);
          Swal.fire('Tipo de Empaque eliminado', `Tipo de Empaque ${tipoEmpaque.descripcion} eliminado correctamente`, 'success');
        }
      );
    });
  }

  abrirModal(tipoEmpaque?: TipoEmpaque) {
    if (tipoEmpaque) {
      this.tipoEmpaqueSeleccionado = tipoEmpaque;
      this.tipo = 'update';
    } else {
      this.tipo = 'new';
      this.tipoEmpaqueSeleccionado = new TipoEmpaque();
    }
    this.ModalTipoEmpaqueService.abrirModal();
  }
  }
