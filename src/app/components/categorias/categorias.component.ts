import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../services/categoria-service.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];

  constructor(private categoriaService: CategoriaService) {
    this.categoriaService.getCategorias().subscribe((data: any) => {
      this.categorias = data;
    });
    }

  ngOnInit() {
  }

}
