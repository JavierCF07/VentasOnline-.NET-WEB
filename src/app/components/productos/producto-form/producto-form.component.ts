import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../producto';
import { TipoEmpaque } from '../../tipo-empaques/tipo-empaque';
import { CategoriaService } from '../../services/categoria-service.service';
import { TipoEmpaqueService } from '../../services/tipo-empaque.service';
import { ProductoService } from '../../services/producto.service';
import { Categoria } from '../../categorias/categoria';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductoCreacionDTO } from '../producto-creacion-dto';
import { ModalProductoService } from '../../services/modal/modal-producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  titulo: string;
  mensaje: string;
  @Input() producto: Producto;

  categorias: Categoria[];
  tipoEmpaques: TipoEmpaque[];

  constructor(
    private categoriaService: CategoriaService,
    private tipoEmpaqueService: TipoEmpaqueService,
    private productoService: ProductoService,
    private router: Router,
    private modalProductoService: ModalProductoService,
    ) {this.titulo = 'Agregar Producto'; }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(categoria => this.categorias = categoria);
    this.tipoEmpaqueService.getTipoEmpaque().subscribe(tipoEmpaque => this.tipoEmpaques = tipoEmpaque);
  }

  create(): void {
    const nuevo = new ProductoCreacionDTO();
    nuevo.codigoCategoria = this.producto.categoria.codigoCategoria;
    nuevo.codigoEmpaque = this.producto.tipoEmpaque.codigoEmpaque;
    nuevo.descripcion = this.producto.descripcion;
    this.productoService.create(nuevo).subscribe(
      producto => {
        Swal.fire('Nuevo producto', `El producto ${this.producto.descripcion} ha sido creado con éxito`,
        'success');
        producto.categoria = this.producto.categoria;
        producto.tipoEmpaque = this.producto.tipoEmpaque;
        this.modalProductoService.notificarCambio.emit(producto);
        this.modalProductoService.cerrarModal();
        this.router.navigate(['/productos']);
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
    const nuevo = new ProductoCreacionDTO();
    nuevo.codigoCategoria = this.producto.codigoCategoria;
    nuevo.codigoEmpaque = this.producto.codigoEmpaque;
    nuevo.descripcion = this.producto.descripcion;
    this.productoService.update(this.producto.codigoProducto, nuevo).subscribe(
      () => {
        Swal.fire('Actualizar producto', `El producto ${nuevo.descripcion}
        ha sido actualizado`, 'success');
        this.modalProductoService.notificarCambio.emit(this.producto);
        this.modalProductoService.cerrarModal();
        this.router.navigate(['/productos']);
      }
    );
  }

  cerrarModal(): void {
    this.modalProductoService.cerrarModal();
  }

  compararCategoria(o1: Categoria, o2: Categoria): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ?
    false : o1.codigoCategoria === o2.codigoCategoria;
  }

  compararTipoEmpaque(o1: TipoEmpaque, o2: TipoEmpaque): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ?
    false : o1.codigoEmpaque === o2.codigoEmpaque;
  }
}
