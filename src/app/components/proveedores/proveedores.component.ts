import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  proveedores: any[] = [];

  constructor(private proveedoresService: ProveedoresService) {
    this.proveedoresService.getProveedores().subscribe((data: any) => {
      this.proveedores = data;
    });
   }

  ngOnInit() {
  }

}
