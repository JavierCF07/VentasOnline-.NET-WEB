import { Component, OnInit } from '@angular/core';
import { TipoEmpaqueService } from '../services/tipo-empaque.service';

@Component({
  selector: 'app-tipo-empaques',
  templateUrl: './tipo-empaques.component.html',
  styleUrls: ['./tipo-empaques.component.css']
})
export class TipoEmpaquesComponent implements OnInit {
  tipoEmpaque: any[] = [];
  
  constructor(private _tipoEmpaqueService: TipoEmpaqueService) {
    this._tipoEmpaqueService.getTipoEmpaque().subscribe((data: any)=>{
      this.tipoEmpaque = data;
    })
   }

  ngOnInit() {
  }

}
