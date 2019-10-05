import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from './producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any[];

  constructor(private productoService: ProductoService) {
    this.productoService.getProductos().subscribe((data: any) => {
      this.productos = data;
    });
   }

  ngOnInit() {

  }

}
