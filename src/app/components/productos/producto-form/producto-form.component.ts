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
  @Input() id: number;

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
    /*if (!this.id) {
      this.producto = new Producto();
    }*/
  }

  create(): void {
    this.productoService.create(this.producto).subscribe(
      producto => {
        this.router.navigate(['/productos']);
        Swal.fire('Nuevo producto', `El producto ${this.producto.descripcion} ha sido creado con éxito`,
        'success');
        this.modalProductoService.cerrarModal();
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
    this.productoService.update(this.producto.codigoProducto, this.producto).subscribe(
      producto => {
        this.router.navigate(['/productos']);
        Swal.fire('Actualizar producto', `El producto ${this.producto.descripcion}
        ha sido actualizado`, 'success');
        this.modalProductoService.cerrarModal();
        this.producto = null;
      }
    );
  }

  cerrarModal(): void {
    this.modalProductoService.cerrarModal();
    console.log(this.id);
  }
}
