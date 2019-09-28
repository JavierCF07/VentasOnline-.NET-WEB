import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { Categoria } from "../../categorias/categoria";
import { TipoEmpaque } from '../../tipo-empaques/tipo-empaque';
import { CategoriaService } from '../../services/categoria-service.service';
import { TipoEmpaqueService } from '../../services/tipo-empaque.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  titulo: string;
  producto: Producto;
  categorias: Categoria[];
  tipoEmpaque: TipoEmpaque[];

  constructor(private categoriaService: CategoriaService, private tipoEmpaqueService: TipoEmpaqueService) { }

  

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(categoria => this.categorias = categoria);
    this.tipoEmpaqueService.getTipoEmpaque().subscribe(tipoEmpaque => this.tipoEmpaque = tipoEmpaque);
  }
}
