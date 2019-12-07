import { Component, OnInit, Input } from '@angular/core';
import { Compras } from '../compras';
import { Proveedores } from '../../proveedores/proveedores';
import { ComprasService } from '../../services/compras.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalProductoService } from '../../services/modal/modal-producto.service';
import { ComprasCreacionDTO } from '../compras-creacion-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras-form',
  templateUrl: './compras-form.component.html'
})
export class ComprasFormComponent implements OnInit {
  titulo: string;
  mensaje: string;
  @Input() compra: Compras;

  compras: Compras[] = [];
  proveedores: Proveedores[] = [];

  constructor(
    private comprasService: ComprasService,
    private proveedorService: ProveedoresService,
    private router: Router,
    private modalCompraService: ModalProductoService,
    private activatedRoute: ActivatedRoute
  ) { this.titulo = 'Agregar Compra'; }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = + params.get('page');
      if (!page) {
        page = 0;
      }
      this.comprasService.getComprasPage(page).subscribe((
        response: any) => {
        this.compras = response.content as Compras[];
      });
    });
    this.proveedorService.getProveedores().subscribe(proveed => this.proveedores = proveed as Proveedores[]);
  }

  create(): void {
    const nuevo = new ComprasCreacionDTO();
    nuevo.numeroDocumento = this.compra.numeroDocumento;
    nuevo.codigoProveedor = this.compra.proveedores.codigoProveedor;
    nuevo.fecha = this.compra.fecha;
    nuevo.total = this.compra.total;
    this.comprasService.create(nuevo).subscribe(
      compra => {
        Swal.fire('Nueva compra', `La compra ${this.compra.numeroDocumento} ha sido creado correctamente`,
          'success');
        compra.proveedores = this.compra.proveedores;
        this.modalCompraService.notificarCambio.emit(compra);
        this.modalCompraService.cerrarModal();
        this.router.navigate(['/compras']);
      },
      error => {
        this.mensaje = 'The description field is required';
        if (this.mensaje) {
          console.log(nuevo);
          Swal.fire('Nueva compra', 'No puede dejar los campos vacios', 'error');
        }
      }
    );
  }

  update(): void {
    const nuevo = new ComprasCreacionDTO();
    nuevo.numeroDocumento = this.compra.numeroDocumento;
    nuevo.codigoProveedor = this.compra.proveedores.codigoProveedor;
    nuevo.fecha = this.compra.fecha;
    nuevo.total = this.compra.total;
    this.comprasService.update(this.compra.idCompra, nuevo).subscribe(
      () => {
        Swal.fire('Actualizar compra', `La compra ${nuevo.numeroDocumento} ha sido actualizado`,
          'success');
        this.modalCompraService.notificarCambio.emit(this.compra);
        this.modalCompraService.cerrarModal();
        this.router.navigate(['/compras']);
      }
    );
  }

  cerrarModal(): void {
    this.modalCompraService.cerrarModal();
  }

  compararProveedores(o1: Proveedores, o2: Proveedores): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ?
    false : o1.codigoProveedor === o2.codigoProveedor;
  }
}
