import { Component, OnInit, Input } from '@angular/core';
import { Proveedores } from '../proveedores';
import { ProveedoresService } from '../../services/proveedores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalProductoService } from '../../services/modal/modal-producto.service';
import { ProveedoresCreacionDTO } from '../proveedores-creacion-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores-form',
  templateUrl: './proveedores-form.component.html',
  styleUrls: ['./proveedores-form.component.css']
})
export class ProveedoresFormComponent implements OnInit {
  titulo: string;
  mensaje: string;
  @Input() proveedor: Proveedores;

  proveedores: Proveedores[] = [];

  constructor(
    private proveedoresService: ProveedoresService,
    private router: Router,
    private modalProveedorService: ModalProductoService,
    private activatedRoute: ActivatedRoute
  ) { this.titulo = 'Agregar Proveedor'; }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = + params.get('page');
      if (!page) {
        page = 0;
      }
      this.proveedoresService.getProveedoresPage(page).subscribe((
        response: any) => {
          this.proveedores = response.content as Proveedores[];
        });
    });
  }

  create(): void {
    const nuevo = new ProveedoresCreacionDTO();
    nuevo.nit = this.proveedor.nit;
    nuevo.razonSocial = this.proveedor.razonSocial;
    nuevo.direccion = this.proveedor.direccion;
    nuevo.paginaWeb = this.proveedor.paginaWeb;
    nuevo.contactoPrincipal = this.proveedor.contactoPrincipal;
    this.proveedoresService.create(nuevo).subscribe(
      proveedor => {
        Swal.fire('Nuevo Proveedor', `El proveedor ${this.proveedor.razonSocial} ha sido creado correctamente`,
        'success');
        this.modalProveedorService.notificarCambio.emit(proveedor);
        this.modalProveedorService.cerrarModal();
        this.router.navigate(['/proveedores']);
      },
      error => {
        this.mensaje = 'The description field is required';
        if (this.mensaje) {
          Swal.fire('Nuevo proveedor', 'No puede dejar los campos vacios', 'error');
        }
      }
    );
  }

  update(): void {
    const nuevo = new ProveedoresCreacionDTO();
    nuevo.nit = this.proveedor.nit;
    nuevo.razonSocial = this.proveedor.razonSocial;
    nuevo.direccion = this.proveedor.direccion;
    nuevo.paginaWeb = this.proveedor.paginaWeb;
    nuevo.contactoPrincipal = this.proveedor.contactoPrincipal;
    this.proveedoresService.update(this.proveedor.codigoProveedor, nuevo).subscribe(
      () => {
        Swal.fire('Actualizar proveedor', `El proveedor ${nuevo.razonSocial} ha sido actualizado correctamente`,
        'success');
        this.modalProveedorService.notificarCambio.emit(this.proveedor);
        this.modalProveedorService.cerrarModal();
        this.router.navigate(['/proveedores']);
      }
    );
  }

  cerrarModal(): void {
    this.modalProveedorService.cerrarModal();
  }
}
