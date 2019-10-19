import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalProductoService {
  modal: boolean;

  constructor() { }

  abrirModal() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }
}
