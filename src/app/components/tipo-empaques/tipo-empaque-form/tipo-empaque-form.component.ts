import { Component, OnInit, Input } from '@angular/core';
import { TipoEmpaque } from '../tipo-empaque';
import { TipoEmpaqueService } from '../../services/tipo-empaque.service';
import { Router } from '@angular/router';
import { ModalProductoService } from '../../services/modal/modal-producto.service';
import { TipoEmpaqueCreacionDTO } from '../tipo-empaque-creacion-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-empaque-form',
  templateUrl: './tipo-empaque-form.component.html',
  styleUrls: ['./tipo-empaque-form.component.css']
})
export class TipoEmpaqueFormComponent implements OnInit {
  titulo: string;
  mensaje: string;
  @Input() tipoEmpaque: TipoEmpaque;

  tipoEmpaques: TipoEmpaque[];

  constructor(
    private tipoEmpaqueService: TipoEmpaqueService,
    private router: Router,
    private modalTipoEmpaqueService: ModalProductoService
  ) { this.titulo = 'Agregar Tipo de Empaque'; }

  ngOnInit() {
    this.tipoEmpaqueService.getTipoEmpaque().subscribe(tipoEmpaque => this.tipoEmpaques = tipoEmpaque);
  }

  create(): void {
    const nuevo = new TipoEmpaqueCreacionDTO();
    nuevo.descripcion = this.tipoEmpaque.descripcion;
    this.tipoEmpaqueService.create(nuevo).subscribe(
      tipoEmpaque => {
        Swal.fire('Nuevo tipo de empaque', `El tipo de empaque ${this.tipoEmpaque.descripcion} ha sido creado correctamente`,
        'success');
        this.modalTipoEmpaqueService.notificarCambio.emit(tipoEmpaque);
        this.modalTipoEmpaqueService.cerrarModal();
        this.router.navigate(['/tipoEmpaque']);
      },
      error => {
        this.mensaje = 'The descripcion field is required';
        if (this.mensaje) {
          Swal.fire('Nuevo producto', 'No puede dejar los campos vacios', 'error');
        }
      }
    );
  }

  update(): void {
    const nuevo = new TipoEmpaqueCreacionDTO();
    nuevo.descripcion = this.tipoEmpaque.descripcion;
    this.tipoEmpaqueService.update(this.tipoEmpaque.codigoEmpaque, nuevo).subscribe(
      () => {
        Swal.fire('Actualizar tipo de empaque', `El tipo de empaque ${nuevo.descripcion}
        ha sido actualizado`, 'success');
        this.modalTipoEmpaqueService.notificarCambio.emit(this.tipoEmpaque);
        this.modalTipoEmpaqueService.cerrarModal();
        this.router.navigate(['/tipoEmpaque']);
      }
    );
  }

  cerrarModal(): void {
    this.modalTipoEmpaqueService.cerrarModal();
  }
}
