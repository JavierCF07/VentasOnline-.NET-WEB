import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria-service.service';
import { CategoriaCreacionDTO } from './categoria-creacion-dto';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
  categoriaSeleccionada: CategoriaCreacionDTO;
  id: number;

  constructor(private categoriaService: CategoriaService) {
    this.categoriaService.getCategorias().subscribe((data: any) => {
      this.categorias = data;
    });
    }

  ngOnInit() {
  }

}
